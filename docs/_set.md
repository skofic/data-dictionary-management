### _set



> TITLE
> 
> ------

#### Set data container



> DEFINITION
> 
> ------

###### This property describes a set of data value, a set is a list of values of the same type that are unique.



> DESCRIPTION
> 
> ------

This property defines the *shape* and *type* of a *set* of *values*. The values in the set must be *unique*, they *cannot* be *repeated*, and the *type definitions* refer to the *set elements*.



> EXAMPLES
> 
> ------

```json
{
	"_set": {
		"_class": "_class_quantity",
		"_type": "_type_integer",
		"_min-range-inclusive": 5,
		"_max-range-inclusive": 10
	}
}
```

This example describes a *set* of *integer values* in the *range* from `5` to `10` inclusive, no two numbers may be repeated.

```json
{
	"_set": {
		"_class": "_class_quantity",
		"_type": "_type_number",
		"_min-range-inclusive": 0.0,
		"_max-range-exclusive": 100.0,
		"_unit": "_data_unit_length_cm"
	}
}
```

This example describes a *set* of *numbers* whose value is *greater or equal* to `0.0` and *less than* `100.0` representing a *lengths* in *centimetres*, no two numbers may be repeated.

```json
{
	"_set": {
		"_class": "_class_category",
		"_type": "_type_string_enum",
		"_kind": "iso_639_3"
	}
}
```

This example describes a *set* of *elements* from the *controlled vocabulary* of ISO 639 *language codes*, no two languages in the list may be the same.

```json
{
	"_set": {
		"_class": "_class_other",
		"_type": "_type_string",
		"_format": "_format_markdown"
	}
}
```

This example describes a *set* of *text* *values* *encoded* in *Markdown* format, no two texts can be the same.

```json
{
	"_set": {}
}
```

This example describes a *set* of *values* of *any type*. The data must be an *array*, it *cannot* be a *scalar* or *object* and the *elements* of the array must be *unique*.