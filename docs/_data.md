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

All terms that feature this property are [descriptors](_term_descriptor.md), all *other* term types *should not* have it. This object requires *one* of the following properties:

- [Scalar data container](_scalar.md): This property contains the *data type* definitions and *constraints* for *scalar data values*.
- [Array data container](_array.md): This property contains the *data type* definitions and *constraints* for *array data values*, which represent a *list* of *data values* of the *same type*.
- [Set data container](_set.md): This property contains the *data type* definitions and *constraints* for *set data values*, which represent a *list* of *data values* of the *same type* whose values are *unique*.
- [Key/value dictionary data container](_dict.md): This property contains the *key* and *value* definitions and *constraints* for *key/value dictionary values*.

You can set this property to an *empty object*, in that case it means that the *descriptor* can have *any container* of *any value*.



> EXAMPLES
> 
> ------

```json
{
	"_data": {
		"_scalar": {
			"_class": "_class_quantity",
			"_type": "_type_integer",
			"_valid-range": {
				"_min-range-inclusive": 5,
				"_max-range-inclusive": 10
			}
		}
	}
}
```

The above example describes a [scalar](_scalar.md) discrete [integer](_type_integer.md) [quantitative](_class_quantity.md) value in the range from `5` to `10` inclusive.



```json
{
	"_data": {
		"_array": {
			"_class": "_class_quantity",
			"_type": "_type_number",
			"_valid-range": {
				"_min-range-inclusive": 0.0,
				"_max-range-exclusive": 100.0,
			},
			"_unit": "_data_unit_length_cm"
		}
	}
}
```

The above example describes a [list](_array.md) of [continuous](_type_number.md) [quantitative](_class_quantity.md) values *greater or equal* to `0.0` and *less than* `100.0` representing a *length* in *centimetres*.



```json
{
	"_data": {
		"_set": {
			"_class": "_class_category",
			"_type": "_type_string_enum",
			"_kind": ["iso_639_3"]
		}
	}
}
```

The above example describes *list* of [unique elements](_set.md) belonging to the `iso_639_3` controlled vocabulary.



```json
{
	"_data": {
		"_dict": {
			"_dict_key": {
				"_class": "_class_category",
				"_type": "_type_string_enum",
				"_kind": ["iso_3166_1", "iso_3166_3"]
			},
			"_dict_value": {
				"_dict": {
					"_dict_key": {
						"_class": "_class_category",
						"_type": "_type_string_enum",
						"_kind": ["iso_639_3"]
					},
					"_dict_value": {
						"_array": {
							"_class": "_class_other",
							"_type": "_type_object",
							"_kind": ["some_object_definition"],
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
}
```

The above example describes a [dictionary](_dict.md) whose *keys* are the [global identifiers](_gid.md) of the ISO 3166 part 1 or part 3 country *controlled vocabulary elements*, and the values are *another dictionary* whose keys are ISO 639 languages and whose *values* are *arrays* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements. This is an example of a recursive dictionary definition.



```json
{
	"_data": {
		"_scalar": {}
	}
}
```
This example shows the *data definition* for a *descriptor* that can take *only* [scalar](_scalar.md) values of any [type](_type.md).



```json
{
	"_data": {}
}
```
This example shows the *data definition* for a *descriptor* that can take *any data shape* or *value*.