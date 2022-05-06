# _array

Array data container

This property describes an array data values, an array is a list of values of the same type.

This property defines the *shape* and *type* of an *array* of *values*. An array is a *list* of *values* of the *same type*, values can be *repeated* and the *type definitions* refer to the *list elements*.

```json
{
    "_array": {
        "_class": "_class_quantity",
        "_type": "_type_integer",
        "_min-range-inclusive": 5,
        "_max-range-inclusive": 10
    }
}
```

This example describes an *array* of *integer values* in the *range* from `5` to `10` inclusive, the *list element* values are *quantitatve*.

```json
{
    "_array": {
        "_class": "_class_quantity",
        "_type": "_type_number",
        "_min-range-inclusive": 0.0,
        "_max-range-exclusive": 100.0,
        "_unit": "_unit_length_cm"
    }
}
```

This example describes an *array* of *numbers* whose value is *greater or equal* to `0.0` and *less than* `100.0` representing a *lengths* in *centimetres*, the *list element* values are *quantitatve*.

```json
{
    "_array": {
        "_class": "_class_category",
        "_type": "_type_enum",
        "_kind": "iso_639_3"
    }
}
```

This example describes an *array* of *elements* from the *controlled vocabulary* of ISO 639 *language codes*, the *list element* values are *categorical*.

```json
{
    "_array": {
        "_class": "_class_other",
        "_type": "_type_string",
        "_format": "_format_markdown"
    }
}
```

This example describes an *array* of *text* *values* *encoded* in *Markdown* format.

```json
{
    "_array": {}
}
```

This example describes an *array* that can have *elements* of *any type*. Note that data *must be* an *array*, *not* an *object* or a *scalar*.