### _dict_key



> TITLE
> 
> ------

#### Dictionary key data container



> DEFINITION
> 
> ------

###### This property describes the data type of dictionary keys, keys are strings that may belong to controlled vocabularies.



> DESCRIPTION
> 
> ------

This property is an *object structure* that contains the *data definition* for a *dictionary key*. Dictionary keys can be *strings* or *enumerations*.

You *cannot omit* this *property*, but you can *set* it to an *empty object*, in that case it is assumed the dictionary *key* can be *any string*.



> EXAMPLES
> 
> ------

```json
{
	"_dict_key": {
		"_class": "_class_category",
		"_type": "_type_string_enum",
		"_kind": "iso_639_3"
	},
}
```

This example describes a *dictionary* whose *keys* are the *global identifiers* of the ISO 639 languages *controlled vocabulary elements*.

```json
{
	"_dict_key": {
		"_class": "_class_other",
		"_type": "_type_string"
	},
}
```

This example describes a *dictionary* whose *keys* are *plain strings*.

```json
{
	"_dict_key": {
		"_class": "_class_category",
		"_type": "_type_string_enum",
		"_kind": "iso_3166_1"
	},
}
```

This example describes a *dictionary* whose *keys* are the *global identifiers* of the ISO 3166 country *controlled vocabulary elements*.

```json
{
	"_dict_key": {},
}
```

This example describes a dictionary whose *keys* can be *any string*.