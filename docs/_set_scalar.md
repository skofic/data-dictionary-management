### _set_scalar



> TITLE
> 
> ------

#### Set scalar data container



> DEFINITION
> 
> ------

###### This property describes the container for the elements of a set.



> DESCRIPTION
> 
> ------

This property defines the [data type](_set_type.md) of the *elements* of a [set](_set.md). Since a set is a *list* of *unique elements*, these elements must be *comparable* in order to prevent duplicate items. Set elements can be [booleans](_type_boolean.md), [integers](_type_integer.md), [floats](_type_number.md) and [strings](_type_string.md).



> EXAMPLES
> 
> ------

```json
{
	"_set_scalar": {
		"_set_type": "_type_boolean"
	}
}
```
The *elements* of the [set](_set.md) can either be, `true` or `false`.




```json
{
	"_set_scalar": {
		"_class": "_class_quantity",
		"_set_type": "_type_integer"
	}
}
```
The *elements* of the [set](_set.md) are [quantitative](_class_quantity.md) values of [type](_set_type.md) [integer](_type_integer.md).




```json
{
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
```
The *elements* of the [set](_set.md) are [continuous](_type_number.md) [quantitative](_class_quantity.md) values *greater or equal* to `0.0` and *less than* `100.0` representing [centimetres](_unit_length_cm.md).




```json
{
	"_set_scalar": {
		"_class": "_class_category",
		"_set_type": "_type_string_enum",
		"_kind": ["iso_639_3"]
	}
}
```
The *elements* of the [set](_set.md) are [categorical](_class_category.md) [enumerations](_type_string_enum.md) that must be chosen from the ISO 639 [language codes](iso_639_3.md).