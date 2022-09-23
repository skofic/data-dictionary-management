### _data



> TITLE
> 
> ------

#### Data section



> DEFINITION
> 
> ------

###### This property groups all properties whose function is to define the shape and type of data, terms that represent descriptors must contain this property.



> DESCRIPTION
> 
> ------

All terms that feature this property are [descriptors](_term_descriptor), all *other* term types *should not* have it. This [object](_container) requires *one* of the following properties:

- [Scalar data container](_scalar): This property contains the *data type* definitions and *constraints* for [scalar data values](_container_scalar).
- [Array data container](_array): This property contains the *data type* definitions and *constraints* for [array data values](_container_array), which represent a *list* of *data values* of the *same type*.
- [Set data container](_set): This property contains the *data type* definitions and *constraints* for [set data values](_container_set), which represent a *list* of *data values* of the *same type* whose values are *unique*.
- [Key/value dictionary data container](_dict): This property contains the *key* and *value* definitions and *constraints* for [key/value dictionary values](_container_dict).

You can set this property to an *empty object*, in that case it means that the *descriptor* can have *any container* with *any value*.



> EXAMPLES
> 
> ------

```json
{
	"_data": {
		"_scalar": {
			"_class": "_class_quantity",
			"_type": "_type_integer",
			"_min-range-inclusive": 5,
			"_max-range-inclusive": 10
		}
	}
}
```

This example describes a *scalar discrete integer* quantitative value in the range from `5` to `10` inclusive.

```json
{
	"_data": {
		"_array": {
			"_class": "_class_quantity",
			"_type": "_type_number",
			"_min-range-inclusive": 0.0,
			"_max-range-exclusive": 100.0,
			"_unit": "_data_unit_length_cm"
		}
	}
}
```

This example describes a *list* of *continuous quantitative* values *greater or equal* to `0.0` and *less than* `100.0` representing a *length* in *centimetres*.

```json
{
	"_data": {
		"_set": {
			"_class": "_class_category",
			"_type": "_type_string_enum",
			"_kind": "iso_639_3"
		}
	}
}
```

This example describes a *text* value *encoded* in *Markdown* format.

```json
{
	"_data": {
		"_dict": {
			"_dict_key": {
				"_class": "_class_category",
				"_type": "_type_string_enum",
				"_kind": "iso_3166_1"
			},
			"_dict_value": {
				"_dict": {
					"_dict_key": {
						"_class": "_class_category",
						"_type": "_type_string_enum",
						"_kind": "iso_639_3"
					},
					"_dict_value": {
						"_array": {
							"_class": "_class_other",
							"_type": "_type_object",
							"_kind": "some_object_definition",
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

This example describes a *dictionary* whose *keys* are the [global identifiers](_gid) of the ISO 3166 country *controlled vocabulary elements*, and the values are *another dictionary* whose keys are ISO 639 languages and whose *values* are *arrays* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements. This is an example of a recursive dictionary definition.

```json
{
	"_data": {}
}
```

This example shows the *data definition* for a *descriptor* that can take *any data shape* or *value*.