### _elements



------
TITLE

------

#### Allowed number of elements



------
DEFINITION

------

###### This field indicates the allowed range of elements.



------
DESCRIPTION

------

This field is used to *limit* the *number of items* in [arrays](_type_array) or [sets](_type_set). It is a *discrete range* that must be *greater than zero*.



------
EXAMPLES

------

```json
{
	"_min-items": 1,
	"_max-items": 8
}
```

The *array* or *set* can have between `1` and `8` elements.

```json
{
	"_min-items": 0
}
```

The *array* or *set* must have at least *one* element.

```json
{
	"_max-items": 10
}
```

The *array* or *set* must have less than 10 items.