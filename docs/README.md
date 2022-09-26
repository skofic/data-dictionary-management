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
- [Global identifier](_gid.md) (`_gid`): The *global identifier* uniquely identifies the term in all [namespaces](_nid.md), it is the *unique identifier* of the *term*. This field is not assigned, it is computed  by the concatenating the [namespace](_nid.md) with the [local identifier](_lid.md) separated by an underscore (`_`) token. In the current implementation, this value is copied to the [document key](_key). This field is required and immutable.
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
- [Definition](_definition.md) (`_definition`): This field should *contain* an *explanation* that must provide *enough information*, to a person *familiar with the subject matter*, to *understand* and *make use* of the term data. 