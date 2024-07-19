### _range



------
#### Range of numbers



------
###### This property indicates a generic range of numbers.



------
This property can be used to indicate a [continuous](_type_number.md) numeric *range*, this range may *ignore* the *lower* or *upper* bound, and it allows specifying whether the *bounds* are *included* in the range, or not. The property is an object that may contain the following combination of elements:

- [Minimum range inclusive](_min-range-inclusive.md): The value must be greater than or equal to the bound.
- [Minimum range exclusive](_min-range-exclusive.md): The value must be greater than the bound.
- [Maximum range inclusive](_max-range-inclusive.md): The value must be less than or equal to the bound.
- [Maximum range exclusive](_max-range-exclusive.md): The value must be less than the bound.

It is possible to omit the minimum or maximum bound.

The *range* defined by this property is *generic*, this means that values out of the range are not necessarily expected to be incorrect.



------
```json
{
	"_range": {
		"_min-range-inclusive": 0.0,
		"_max-range-inclusive": 100.0
	}
}
```
This represents a *percentage range*, values are *greater* than or *equal* to `0` and smaller or equal to `100`. Fractional values are allowed.



```json
{
	"_range": {
		"_min-range-inclusive": 0,
		"_max-range-inclusive": 100
	}
}
```
Same as above, except that we use integers. Fractional values are allowed.



```json
{
	"_range": {
		"_min-range-exclusive": 0
	}
}
```
Values are greater than `0`. Fractional values are allowed.