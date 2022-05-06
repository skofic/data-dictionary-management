# _range_elements

Elements range

Object definition for a property defining a *discrete range* used to assess items r elements count.

This *property* represents a *discrete numeric range*, it is an *object* that expects *one* or *two* properties that *define* the *lower* and/or *upper* range bounds:

- [Lower bound](_min-items): Minimum number of items.
- [Upper bound](_max-items): Maximum number of items.

Either the lower or upper bound can be *omitted* to create an *open range*.

The *numeric* value is *continuous*, by default the value will be assumed to be an [integer](_type_integer) and the value cannot be less than `0`.

```json
{
  	"_min-items": 1,
  	"_max-items": 8
}
```

The element count must be between `1` and `8`.

```json
{
  	"_min-items": 0
}
```

There must be at least *one* element.

```json
{
  	"_max-items": 10
}
```

There must be less than 10 items.