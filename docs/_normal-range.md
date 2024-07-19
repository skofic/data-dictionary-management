### _normal-range



------
#### Normal range of numbers



------
###### This field indicates the normal range for numbers, values that are out of range are considered outliers, not errors.



------
This property defines the range in which values are considered *normal*, values out of this range are considered *outliers*. This [continuous](_type_number.md) numeric *range* may *ignore* the *lower* or *upper* bound, and it allows specifying whether the *bounds* are *included* in the range, or not. The property is an object that may contain the following combination of elements:

- [Minimum range inclusive](_min-range-inclusive.md): The value must be greater than or equal to the bound.
- [Minimum range exclusive](_min-range-exclusive.md): The value must be greater than the bound.
- [Maximum range inclusive](_max-range-inclusive.md): The value must be less than or equal to the bound.
- [Maximum range exclusive](_max-range-exclusive.md): The value must be less than the bound.

It is possible to omit the minimum or maximum bound.

Out of range values are considered outliers.



------
```json
{
	"_normal-range": {
		"_min-range-inclusive": 0.0,
		"_max-range-inclusive": 100.0
	}
}
```
This *range* considers all values greater than `100.0` or smaller than `0.0` to be outliers.



```json
{
	"_normal-range": {
		"_min-range-inclusive": 0,
		"_max-range-inclusive": 100
	}
}
```
This *range* is equivalent to the first one, except that in this case we don't add decimals to the bounds.



```json
{
	"_normal-range": {
		"_min-range-exclusive": 0
	}
}
```
This *range* considers all positive values greater than 0 to be normal, and all others to be outliers.

