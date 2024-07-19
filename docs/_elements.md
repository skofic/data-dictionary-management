### _elements



------
#### Allowed number of elements



------
###### This field indicates the allowed range of elements for arrays and sets.



------
This field is used to *limit* the *number of items* in [arrays](_array.md) or [sets](_set.md). It is a *discrete range* that must be *greater than zero*.



------
```json
{
	"_elements": {
		"_min-items": 1,
		"_max-items": 8
	}
}
```
The [array](_array.md) or [set](_set.md) can have between `1` and `8` elements.



```json
{
	"_elements": {
		"_min-items": 0
	}
}
```
The [array](_array.md) or [set](_set.md) must have at least *one* element.



```json
{
	"_elements": {
		"_max-items": 10
	}
}
```
The [array](_array.md) or [set](_set.md) must have *less* than 10 items.