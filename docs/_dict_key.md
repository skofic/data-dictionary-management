### _dict_key



> TITLE
> 
> ------

#### Dictionary key data container



> DEFINITION
> 
> ------

###### This property describes the data type of dictionary keys, which must be strings.



> DESCRIPTION
> 
> ------

This property is an *object structure* that contains the *data definition* for a *dictionary key*. Dictionary keys can be [strings](_type_string.md) or [enumerations](_type_string_enum.md).

You *cannot omit* this *property*, but you can *set* it to an *empty object*, in that case it is assumed the dictionary *key* can be any [string](_type_string.md).



> EXAMPLES
> 
> ------

```json
{
	"_dict_key": {
		"_class": "_class_category",
		"_type_key": "_type_string_enum",
		"_kind": ["iso_639_3"]
	}
}
```
This example describes a [dictionary](_dict.md) whose [categorical](_class_category.md) *keys* are the [global identifiers](_gid.md) of the ISO 639 languages [controlled vocabulary elements](iso_639_3.md).



```json
{
	"_dict_key": {
		"_type_key": "_type_string"
	}
}
```
This example describes a [dictionary](_dict.md) whose *keys* are plain [strings](_type_string.md).



```json
{
	"_dict_key": {
		"_class": "_class_category",
		"_type_key": "_type_string_enum",
		"_kind": "iso_3166_1"
	}
}
```
This example describes a [dictionary](_dict.md) whose [categorical](_class_category.md) *keys* are the [global identifiers](_gid.md) of the ISO 3166 country [controlled vocabulary elements](iso_3166_1.md).



```json
{
	"_dict_key": {},
}
```
This example describes a [dictionary](_dict.md) whose *keys* can be any [string](_type_string.md).