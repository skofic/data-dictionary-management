# _scalar

Scalar data container

This property describes a scalar data value, scalar values are single values that do not represent lists or other containers.

This property defines the *shape* and *type* of *scalar data values*. A *number* or a *text* are examples of a scalar values; an *array* of *elements* or a key/value *dictionary* would *not* be considered a scalar value.

```json
{
    "_scalar": {
        "_class": "_data_class_quantity",
        "_type": "_data_type_integer",
        "_min-range-inclusive": 5,
        "_max-range-inclusive": 10
    }
}
```

This example describes a *scalar discrete integer* value in the range from `5` to `10` inclusive.

```json
{
    "_scalar": {
        "_class": "_data_class_quantity",
        "_type": "_data_type_number",
        "_min-range-inclusive": 0.0,
        "_max-range-exclusive": 100.0,
        "_unit": "_data_unit_length_cm"
    }
}
```

This example describes a *continuous quantitative* value *greater or equal* to `0.0` and *less than* `100.0` representing a *length* in *centimetres*.

```json
{
    "_scalar": {
        "_class": "_data_class_category",
        "_type": "_data_type_enum",
        "_kind": "iso_639_3"
    }
}
```

This example describes a *categorical string* that must be chosen from the *controlled vocabulary* of ISO 639 *language codes*.

```json
{
    "_scalar": {
        "_class": "_data_class_other",
        "_type": "_data_type_string",
        "_format": "_data_format_markdown"
    }
}
```

This example describes a *text* value *encoded* in *Markdown* format.

```json
{
    "_scalar": {}
}
```

This example shows a *scalar data definition* that can contain *any value*. This, however, indicates that the *value* may be an *object* or a *single value*, but *not an array*.
