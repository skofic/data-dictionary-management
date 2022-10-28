### _set



------
#### Set data container



------
###### This property describes a container for an array of unique elements of the same data type.



------
This property defines the *shape* and *type* of a *set* of *items*. A *set* is a *list* of *values* of the *same type*, values must be *unique* and the *type definitions* refer to the *list elements*.

The property *must* contain the [scalar](_set_scalar.md) container which defines the [data type](_set_type.md) of the set *elements*, which includes [booleans](_type_boolean.md), [integers](_type_integer.md), [floats](_type_number.md) and [strings](_type_string.md).



------
```json
{
	"_set": {
		"_set_scalar": {
			"_set_type": "_type_boolean"
		}
	}
}
```
This example describes a *set* of [booleans](_type_boolean.md); such a *set* can *only* contain *one* element, `true` or `false`.




```json
{
	"_set": {
		"_set_scalar": {
			"_class": "_class_quantity",
			"_set_type": "_type_integer"
		}
	}
}
```
This example describes a *set* of [discrete](_type_integer.md) [quantitative](_class_quantity.md) values.




```json
{
	"_set": {
		"_set_scalar": {
			"_class": "_class_quantity",
			"_set_type": "_type_number",
			"_valid-range": {
				"_min-range-inclusive": 0.0,
				"_max-range-exclusive": 100.0
			},
			"_unit": "_unit_length_cm"
		}
	}
}
```
This example describes a *set* of [continuous](_type_number.md) [quantitative](_class_quantity.md) values *greater or equal* to `0.0` and *less than* `100.0` representing [centimetres](_unit_length_cm.md).




```json
{
	"_set": {
		"_set_scalar": {
			"_class": "_class_category",
			"_set_type": "_type_string_enum",
			"_kind": ["iso_639_3"]
		}
	}
}
```
This example describes a set of [categorical](_class_category.md) [enumerations](_type_string_enum.md) that must be chosen from the [controlled vocabulary](iso_639_3.md) of ISO 639 *language codes*.