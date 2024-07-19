### _dict_value



------
#### Dictionary value data definition



------
###### This property describes the data type of dictionary key values.



------
This *object* defines the *type* of the *value* in a [dictionary](_dict.md), dictionary values can be of *any type*.

The *property* is *required*, but you can set it to an *empty object*: in that case it means that the dictionary can have *values* of *any shape* or *type*.



------
```json
{
	"_dict_value": {
		"_array": {
			"_scalar": {
				"_type": "_type_object",
				"_kind": "some_object_definition",
				"_elements": {
					"_min-items": 5,
					"_max-items": 10
				}
			}
		}
	}
}
```
This example describes a [dictionary](_dict.md) whose *values* are [arrays](_array.md) of [objects](_type_object.md) that correspond to the `some_object_definition` *data structure type*; these *array* values must have a [minimum](_min-items.md) of `5` [elements](_elements.md) and a [maximum](_max-items.md) of `10` [elements](_elements.md).



```json
{
	"_dict_value": {
		"_scalar": {
			"_type": "_type_string",
			"_format": "_format_markdown"
		}
	}
}
```
This example describes a [dictionary](_dict.md) whose *values* are [text](_type_string.md) in [Markdown](_format_markdown.md) [format](_format.md).



```json
{
	"_dict_value": {
		"_dict": {
			"_dict_key": {
				"_class": "_class_category",
				"_type_key": "_type_string_enum",
				"_kind": "iso_639_3"
			},
			"_dict_value": {
				"_array": {
					"_scalar": {
						"_class": "_class_other",
						"_type": "_type_object",
						"_kind": "some_object_definition",
						"_elements": {
							"_min-items": 5,
							"_max-items": 10
						}
					}
				}
			}
		}
	}
}
```
This example describes a [dictionary](_dict.md) whose *values* are another [dictionary](_dict.md) whose [keys](_dict_key.md) are [ISO 639 languages](iso_639_3.md) and whose *values* are [arrays](_array.md) of [items](_scalar.md) that correspond to the `some_object_definition` [data structure type](_kind.md); these arrays must have a [minimum](_min-items.md) of `5` [elements](_elements.md) and a [maximum](_max-items.md) of `10` [elements](_elements.md). This is an example of a recursive dictionary definition.



```json
{
	"_dict_value": {}
}
```
This example describes a dictionary whose *values* can be *any container* with *any value*.