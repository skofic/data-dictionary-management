### _range_date



------
#### Range of dates



------
###### This property indicates a generic range of dates



------
This property can be used to indicate a (date)[_type_string_date.md] *range*, this range may *ignore* the *lower* or *upper* bound, and it allows specifying whether the *bounds* are *included* in the range, or not. The property is an object that may contain the following combination of elements:

- [Minimum range inclusive](_min-range-inclusive_date.md): The value must be greater than or equal to the bound.
- [Minimum range exclusive](_min-range-exclusive_date.md): The value must be greater than the bound.
- [Maximum range inclusive](_max-range-inclusive_date.md): The value must be less than or equal to the bound.
- [Maximum range exclusive](_max-range-exclusive_date.md): The value must be less than the bound.

It is possible to omit the minimum or maximum bound.

The *range* defined by this property is *generic*, this means that values out of the range are not necessarily expected to be incorrect.



------
```json
{
	"_range": {
		"_min-range-inclusive_date": "1950",
		"_max-range-inclusive_date": "19991231"
	}
}
```

This represents a *date range*, values are *greater* than or *equal* to `1950` and smaller or equal to `19991231`. This interval includes year, month and day dates starting from 1950 and includes year, month and day dates including all 1999.



```json
{
	"_range": {
		"_min-range-exclusive_date": "195001"
	}
}
```

Values are greater than `January 1950`.
This includes all dates greater or equal to february 1950.