# Data dictionary

This tool was developed to allow documenting and curating data sets by storing data definitions in a structure that allows validating the data and providing thorough information to anyone interested in making use of the data.

The dictionary does not store the data itself, it stores the documentation and constraints for each data variable, so that variables have a unique identifier and have a set of documentation fields which can provide all the necessary information to understand *what* the data is, *how* the data can be used, which are the *constraints* the data must follow in order to be valid and any other information that may be useful to both those who use the data and those may be interested in using it.

This tool implements a system in which you define terms of different type which are related to each other in a graph. We use [ArangoDB](https://www.arangodb.com) as the database to implement the system and [Foxx](https://www.arangodb.com/docs/stable/foxx.html) micro services to provide the API.

## Structure

The main object that constitutes the "Lego" pieces in the system is the [term](_term.md). A term is a document that will be stored in the database, which contains properties that define its function. All terms are stored in the terms collection.

### Terms

[Terms](_term.md) are concepts that, depending on what properties they hold and depending on how they are related to each other, have different functions and meanings. This is similar to language, in which certain words may change their meaning depending on their position in a sentence.

Terms come in different types:

- [Plain terms](_term.md): a plain term could be a namespace, represent an enumeration, or an element of a controlled vocabulary.
- [Descriptor](_term_descriptor.md): a descriptor is a term that documents a variable which contains data of a specific type.
- [Structure](_term_object.md): a term that represents a data structure definition.

What makes a term belong to one or another class is a combination of how the term is related to other terms, and if it contains specific properties that define a particular behaviour.

#### Identification section (`_code`)

All terms require this [property](_code.md), which is a data structure that contains a series of fields used to identify the term, no term may omit this section. These are the fields that make up the section:

- [Namespace](_nid.md) (`_nid`): The *namespace* is used to group other terms under a common nomenclature. This makes the naming of terms easier, when their number grows. Also it allows several terms to share the same code without conflicting. This field's content is a [reference](gid.md) to another term that takes the namespace function. This field os not required, but once it has been set or omitted, it cannot be changed.
- [Local identifier](_lid.md) (`_lid`): The *local identifier* is a code, assigned to the term, which must be unique within its namespace. This code becomes the identifier of the term within the group defined by the namespace. This field is required and once set, it cannot be modified.
- [Global identifier](_gid.md) (`_gid`): The *global identifier* uniquely identifies the term in all [namespaces](_nid.md), it is the *unique identifier* of the *term*. This field is not assigned, it is computed  by the concatenating the [namespace](_nid.md) with the [local identifier](_lid.md) separated by an underscore (`_`) token. In the current implementation, this value is copied to the [document key](_key). *In the dictionary, the global identifier of a descriptor term is used as the property name*. This field is required and immutable.
- [Other identifiers](_aid.md) (`_aid`): This field records all *official* or *agreed* upon codes that *identify* the term. This allows tracking the different identifiers that a term may be referred to. These codes are at the same level as the [local identifier](_lid.md). This field is required, because it must contain by default the [local identifier](_lid.md).
- [Provider identifiers](_pid.md) (`_pid`): This field records the *identifiers* assigned to the *term* by the *data providers*. This becomes useful when submitting or receiving datasets. This field is optional.
- [Original name](_name.md) (`_name`): This field records the local name or original denomination, if this makes sense. This field is optional.

All terms must feature this section which represents the identification data of the term.

```json
{
	"_code": {
		"_lid": "iso",
		"_gid": "iso",
		"_aid": ["iso"]
	}
}
```

Above is an example of a term representing the [International Standards Organisation (ISO)](https://www.iso.org/home.html) namespace. As you can see, it is a *top level namespace*, since it does not include the [namespace field](_nid.md) (**`_nid`**), so its [global identifier](_gid.md) (**`_gid`**) is the same as its [local identifier](_lid.md) (**`_lid`**), `iso`.

```json
{
	"_code": {
		"_nid": "iso",
		"_lid": "3166",
		"_gid": "iso_3166",
		"_aid": ["3166"]
	}
}
```

Above is an example of a term representing the [ISO 3166 - Country Codes](https://www.iso.org/iso-3166-country-codes.htmlhttps://www.iso.org/iso-3166-country-codes.html) standard. This term features `iso` in its [namespace field](_nid.md) (**`_nid`**), so this term belongs to the *ISO* namespace. In this case the `3166` code has a meaning only in the *ISO* context. This is an example of a two level namespace.

```json
{
	"_code": {
		"_nid": "iso_3166",
		"_lid": "1",
		"_gid": "iso_3166_1",
		"_aid": ["1"]
	}
}
```

Above is an example of a term representing the [ISO 3166-1 - (Codes for the representation of names of countries and their subdivisions — Part 1: Country code)](https://en.wikipedia.org/wiki/ISO_3166-1) standard. This term features `iso_3166` in its [namespace field](_nid.md) (**`_nid`**), so this term belongs to the *ISO 3166 - Country Codes* namespace. In this case the `1` code has a meaning only in the *ISO 3166 - Country Codes* context. This is an example of a three level namespace.

```json
{
	"_code": {
		"_nid": "iso_3166_1",
		"_lid": "ITA",
		"_gid": "iso_3166_1_ITA",
		"_aid": ["IT", "ITA"],
		"_pid": ["I"],
		"_name": "Repubblica Italiana"
	}
}
```

Above is an example of a term representing the *ISO 3166-1* code for the country *Italy*.

- [Namespace](_nid.md) (**`_nid`**): The *namespace* is the [global identifier](_gid.md) (**`_gid`**) of the term that represents *ISO 3166-1 Country Codes* standard.
- [Local identifier](_lid.md) (**`_lid`**): The *local identifier* is the country code for *Italy* in the *ISO 3166-1* standard referenced by the [namespace](_nid.md) field (**`_nid`**). No other term belonging to the same namespace may share the same local identifier.
- [Global identifier](_gid.md) (**`_gid`**): The *global identifier* is the *unique identifier* of this *term*, no other term can have this code.
- [Other identifiers](_aid.md) (**`_aid`**): Besides the official `ITA` code, Italy can be identified also with the `IT` code. This field is *useful* when trying to *resolve controlled vocabulary elements* with *data* that *does not follow* strictly the *implemented standards*.
- [Provider identifiers](_pid.md) (**`_pid`**): The *data provider* follows a *different standard* than ours, the code used for *Italy* is `I`. This field can be useful when decoding incoming data which is not yet normalised.
- [Name](_name) (**`_name`**): This field is *relevant* only in *certain cases*, here we store the *official country name* in the *native language* of the *country*, `Repubblica Italiana`.

The identification section is where you have all the necessary information to identify a specific term.

#### Documentation section (`_info`)

While the previous section is mainly used by computers to lookup terms, [this section](_info.md) is mainly used by humans to understand what the term represents and how it can be used.

This property holds an [object data structure](_type_object.md) in which all fields are [key/value dictionaries](_dict.md) where the *key* represents the *language* and the *value* is human readable [text](_type_string.md). These fields should be used to provide, in *several languages*, all the *necessary documentation* to *understand* what the term represents, how the *data* described by the term can be *used*, *why* do we use that data and any other *additional information* that a person, which is not an expert in the subject matter, can use and *take advantage* of the *data* associated with the *term*.

- [Title](_title.md) (`_title`): You can think of the *title* as a *name* or *label*. When presenting an *input form*, the *title* of a [descriptor term](_term_descriptor.md) could be used as the *label* of the *input field*. The text in this [field](_title.md) should be as short as possible and expected to be presented in a relevant context. The value part of the dictionary should contain *plain text*. This property should always be included.
- [Definition](_definition.md) (`_definition`): This field should *contain* an *explanation* that must provide *enough information*, to a person *familiar with the subject matter*, to *understand* and *make use* of the term data. The value part of the dictionary should contain *plain text*. This property is *optional* only if beyond the [title](_title.md) (`_title`), there is *no other relevant information*. It is understood that if you *omit* this field, the only *other fields* that should be included in the section are the [examples](_examples.md) (`_notes`) and [notes](_notes.md) (`_notes`) fields.
- [Description](_description.md) (`_description`): This field should contain *all the information* needed by someone, not expert in the subject matter, to *understand* the *term data*, understand *why* such data is *useful*, understand *how* to *make use of it* and provide *thorough indormation* on *related topics*. The value part of the dictionary should contain [text](_type_text.md) encoded in the [Markdown](https://daringfireball.net/projects/markdown/) [format](_format_markdown.md), this to be able to present a lot of information in an *understandable* and *structured* manner. This field should only be omitted if all the neccessary information was already provided in the [title](_title.md) (`_title`) and [definition](_definition.md) (`_definition`) fields.
- [Examples](_examples.md) (`_examples`): In some cases, it may be useful to *provide examples* of *usage* or *input*: this field should be used to help users make *correct use* of the term. There are instances in which it becomes much easier to explain something by showing an example, use this field if that is the case. The value part of the dictionary should contain [text](_type_text.md) encoded in the [Markdown](https://daringfireball.net/projects/markdown/) [format](_format_markdown.md).
- [Notes](_notes.md) (`_notes`): This field can be used to add notes and comments to this section. The information provided should not represent actual documentation, but mostly related facts and user opinions.The value part of the dictionary should contain [text](_type_text.md) encoded in the [Markdown](https://daringfireball.net/projects/markdown/) [format](_format_markdown.md).

Here is an example of this section:

```json
{
	"_info": {
		"_title": {
			"iso_639_3_eng": "Elevation",
			"iso_639_3_ita": "Elevazione"
		},
		"_definition": {
			"iso_639_3_eng": "Altitude starting from sea level.",
			"iso_639_3_ita": "Altitudine a partire dal livello del mare."
		},
		"_description": {
			"iso_639_3_eng": "Used in climatic and geographic datasets.",
			"iso_639_3_ita": "Utilizzato nei dati climatici e geografici."
		},
		"_examples": {
			"iso_639_3_eng": "0: sea level; 1500: location.",
			"iso_639_3_ita": "0: livello del mare; 1500: posizione."
		},
		"_notes": {
			"iso_639_3_eng": "Values must be expressed in meters.",
			"iso_639_3_ita": "I valori devono essere espressi in metri."
		}
	}
}
```

Obviously the documentation provided in the example is short for formatting reasons, in practice you should record as much information as possible to make this useful.

This section is *required*: all terms should provide *documentation readable by humans* that *explains* what the term represents. There is only one case where it is allowed to omit this section and that is when a controlled vocabulary element has a different preferred choice, which means that all the documentation is already hosted by the term that is the preferred choice. We shall explain this mechanism when we will talk about [edges](_edge.md) and [bridge](_predicate_bridge-of.md) [predicates](_predicate.md).

#### Data section (`_data`)

While all terms must include the [identification](_code.md) and [documentation](_info.md) sections, [this section](_data.md) is *required* by terms that represent [descriptors](_term_descriptor.md). Descriptors are *data definitions*, these terms should provide everything that is necessary to describe the descriptor's data, understand what the data is and all the other information that relates directly to the data, its format and allow the data dictionary to *validate* incoming data. Descriptors are the core of the data dictionary, all other types of terms provide a service and ancillary data to descriptors.

This section is an object structure property that expects *one field* which defines the *data container*.

- [Scalar container](_scalar.md) (`_scalar`): A scalar value is a single value, such as a *number*, *text* or *object*. This section will contain the [data type](_type.md) definitions for the scalar part of the value. If *empty* the value may be any *scalar value* ([arrays](_array.md) and [sets](_set.md) excluded).
- [Array container](_array.md) (`_array`): A list of values of any shape. This section must contain *one* or *none* of the following containers: [scalar](_scalar.md) (`_scalar`), [array](_array.md) (`_array`), [_set.md]() (`_set`) or [dictionary](_dict.md) (`_dict`).
- [Set container](_set.md) (`_set`): A list of values which are unique, no two elements may share the same value. This section must contain the [set scalar](_set_scalar.md) (`_scalar`) container section.
- [Dictionary container](_dict.md) (`_dict`): A key/value dictionary. While it is technically an *object* structure, *keys* are *dynamic*, so they are *not* considered *descriptors*.

Only *one* of the above containers may be included at the level of the [data container](_data.md). It is also possible to *omit* it, leaving the [data container](_data.md) *empty*: in that case the value can be of *any shape* and *type*.

##### Scalar container (`_scalar`)

The leaf element of any data definition is a [scalar](_scalar.md) value. A scalar value is a *data container* that holds a *single* value, *not a list* of values. These are common *types* of *scalar values*:

- A [boolean](_type_boolean.md) value, `true` or `false`.
- An [integer](_type_integer.md) or a [float](_type_number.md) including a [timestamp](_type_number_timestamp.md).
- Text [string](_type_string.md), including a [key reference](_type_string_key-md), [document handle](_type_string_handle.md) and a [controlled vocabulary element](_type_string_enum.md).
- An [object](_type_object.md) data structure, including a [GeoJson object](_type_object_geo-json.md).

The *scalar container definition* is an [object structure](_scalar.md) that holds the following descriptors:

- [Classification](_class.md) (`_class`): An enumeration indicating the data classification.
- [Data type](_type.md) (`_type`): An enumeration indicating the type of the data.
- [Data kind](_kind.md) (`_kind`): This field is related to the [data type](_type.md) (`_type`) value, the data kind is used to *restrict* [enumerations](_type_enum.md) to a specific *controlled vocabulary* and [objects](_type_object.md) to a specific object *structure definition*.
- [Format](_format.md) (`_format`): This field is an [enumeration](_type_string_enum.md) used to indicate in what format the character data is encoded.
- [Unit](_unit.md) (`_unit`): An [enumeration](_type_string_enum.md) that indicates in what unit the data is represented.
- [Unit name](_unit-name.md) (`_unit-name`): The name of the unit, in case it is not yet part of the [unit](_unit.md) enumeration.
- [Regular expression](_regexp.md) (`_regexp`): A *validation* pattern for [strings](_type_string.md).
- [Range](_range.md) (`_range`): A structure property indicating a generic *range*.
- [Valid range](_valid-range.md) (`_valid-range`): A structure property indicating the *range* within which values are *valid*; values out of range are considered *errors*.
- [Normal range](_normal-range.md) (`_normal-range`): A structure property indicating the *range* within which values are considered *normal*; values out of range are considered *outliers*.



