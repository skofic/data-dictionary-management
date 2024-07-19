### _info



------
#### Documentation section



------
###### This object groups all properties whose function is to document, explain and comment on terms.



------
This property holds a [section](_type_object.md) that *groups* all the fields used to *document* a *term*. All the properties contained in this section are a key/value [dictionaries](_dict.md) in which the *key* is an [enumerated](_type_string_enum.md) [language](iso_639_3) code, and the value is the [text](_type_string.md) representing the [title](_title.md), [definition](_definition.md), [description](_description.md), [examples](_examples.md) and [notes](_notes.md) regarding the *term* in which the *section* is *included*.

This property is *required* by all term types, there is only *one* case in which it can be *omitted*: if the term is a [controlled vocabulary element](_type_string_enum.md) and there is a [bridge](_predicate_bridge-of.md) relationship to a preferred term, this section can be omitted, since it would contain the same content as the referenced term. This case occurs when the same enumeration has different codes and you want to enforce one specific code version as default.

This section includes the following properties:

- [Title](_title.md): title, name or label.
- [Definition](_definition.md): definition or summary description.
- [Description](_description.md): extensive and thorough description with explanations.
- [Examples](_examples.md): eventual usage examples.
- [Notes](_notes.md): notes, comments and additional information.



------
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