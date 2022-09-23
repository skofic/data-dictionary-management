### _scalar



> TITLE
> 
> ------

#### Scalar data container



> DEFINITION
> 
> ------

###### This property describes a container for a single value of any type.



> DESCRIPTION
> 
> ------

This property defines the *shape* and *type* of *scalar data values*. A *number* or a *text* are examples of a scalar values; an *array* of *elements* or a key/value *dictionary* would *not* be considered a scalar value.



> EXAMPLES
> 
> ------

```json
{
	"_scalar": {
		"_class": "_class_quantity",
		"_type": "_type_integer",
		"_valid-range": {
			"_min-range-inclusive": 5,
			"_max-range-inclusive": 10
		}
	}
}
```
This example describes a [quantitative](__class_quantity.md) *scalar* discrete [integer](_type_integer.md) value in the *range* from `5` to `10` inclusive.




```json
{
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
```
This example describes a [continuous](_type_number.md) [quantitative](_class_quantity.md) value *greater or equal* to `0.0` and *less than* `100.0` representing a length in [centimetres](_unit_length_cm.md).




```json
{
	"_scalar": {
		"_class": "_class_category",
		"_type": "_type_string_enum",
		"_kind": ["iso_639_3"]
	}
}
```
This example describes a [categorical](_class_category.md) [enumeration](_type_string_enum.md) that must be chosen from the [controlled vocabulary](iso_639_3.md) of ISO 639 *language codes*.




```json
{
	"_scalar": {
		"_type": "_type_string",
		"_format": "_format_markdown"
	}
}
```
This example describes a [text](_type_string.md) value *encoded* in [Markdown](_format_markdown.md) format.




```json
{
	"_scalar": {}
}
```
This example shows the *data definition* for a *descriptor* that can hold *scalar* values of *any type*, this means that the container *does not accept* [arrays](_array.md), [sets](_set.md) or [dictionaries](_dict.md).