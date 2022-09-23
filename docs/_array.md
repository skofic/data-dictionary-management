### _array



> TITLE
> 
> ------

#### Array data container



> DEFINITION
> 
> ------

###### This property describes a container for an array of elements of the same data type.



> DESCRIPTION
> 
> ------

This property defines the *shape* and *type* of an *array* of *items*. An array is a *list* of *values* of the *same type*, values can be *repeated* and the *type definitions* refer to the *list elements*.

The property can contain *one* of the following elements:

- [Scalar elements](_scalar.md): The array elements must be *scalar values*.
- [Array elements](_array.md): The array contains a list of *arrays*.
- [Set elements](_set.md): The array contains a list of *sets*.
- [Key/value dictionary elements](_dict.md): The array contains a list of *key/value dictionaries*.

The property may also be *empty*, in which case the array *elements* can be of any *shape* or *type*.



> EXAMPLES
> 
> ------

```json
{
	"_array": {
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
This example describes an *array* of [scalar](_scalar.md) [integer](_type_integer.md) values in the *range* from `5` to `10` inclusive, the *list element* values are [quantitatve](_class_quantity.md).



```json
{
	"_array": {
		"_array": {
			"_scalar": {
				"_class": "_class_quantity",
				"_type": "_type_number",
				"_valid-range": {
					"_min-range-inclusive": 0.0,
					"_max-range-exclusive": 100.0
				},
				"_unit": "_unit_length_cm"
			}
		}
	}
}
```
This example describes a *list* of *arrays* of [numbers](_type_number.md) whose value is *greater than or equal* to `0.0` and *less than* `100.0` representing *lengths* in [centimetres](_unit_length_cm.md), the *elements* of the *inner list* are [quantitatve](_class_quantity.md).



```json
{
	"_array": {
		"_set": {
			"_scalar": {
				"_class": "_class_category",
				"_type": "_type_string_enum",
				"_kind": ["iso_639_3"]
			}
		}
	}
}
```
This example describes an *array* of [sets](_set.md) whose *elements* belong to the [enumeration](_type_string_enum.md) of ISO 639 [language codes](iso_639_3.md), the *elements* of the *inner set* are [categorical](_class_category.md).



```json
{
	"_array": {
		"_dict": {
			"_dict_key": {
				"_class": "_class_category",
				"_type_key": "_type_string_enum",
				"_kind": ["iso_3166_1"]
			},
			"_dict_value": {
				"_scalar": {
					"_type": "_type_object",
					"_kind": ["my_struct_definition"]
				}
			}
		}
	}
}
```
This example describes an *array* of [key/value dictionary](_dict.md) *items*. The [dictionary keys](_dict_key.md) are [categorical](_class_category.md) and must be selected among the elements of the [ISO country codes](iso_3166_1.md) [controlled vocabulary](_type_string_enum.md). The dictionary values are [objects](_type_object.md) of the `my_struct_definition` class.



```json
{
	"_array": {}
}
```
This example describes an *array* that can have *elements* of *any shape* or *type*.