### _valid-range



------
#### Valid number range



------
###### This field indicates the allowed range for numbers, values that are out of range are considered invalid.



------
This property defines the range within which a value can be considered correct. Values that out of this range are considered errors. This [continuous](_type_number.md) numeric *range* may *ignore* the *lower* or *upper* bound, and it allows specifying whether the *bounds* are *included* in the range, or not. The property is an object that may contain the following combination of elements:

- [Minimum range inclusive](_min-range-inclusive.md): The value must be greater than or equal to the bound.
- [Minimum range exclusive](_min-range-exclusive.md): The value must be greater than the bound.
- [Maximum range inclusive](_max-range-inclusive.md): The value must be less than or equal to the bound.
- [Maximum range exclusive](_max-range-exclusive.md): The value must be less than the bound.

It is possible to omit the minimum or maximum bound.

Values that *do not belong* in the *range* interval are considered *incorrect*.



------
```json
{
	"_valid-range": {
		"_min-range-inclusive": 0.0,
		"_max-range-inclusive": 100.0
	}
}
```
This *range* considers all values greater than `100.0` and smaller than `0.0` to be errors.



```json
{
	"_valid-range": {
		"_min-range-inclusive": 0,
		"_max-range-inclusive": 100
	}
}
```
This *range* is equivalent to the first one, except that in this case we don't add decimals to the bounds.



```json
{
	"_valid-range": {
		"_min-range-exclusive": 0
	}
}
```
This *range* considers all positive values greater than 0 to be correct.