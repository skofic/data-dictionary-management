### _normal-range_date



------
#### Normal range of dates



------
###### This field indicates the normal range for dates, values that are out of range are considered outliers, not errors.



------
This property defines the range in which values are considered *normal*, values out of this range are considered *outliers*. This date *range* may *ignore* the *lower* or *upper* bound, and it allows specifying whether the *bounds* are *included* in the range, or not. The property is an object that may contain the following combination of elements:

- [Minimum range inclusive](_min-range-inclusive_date.md): The value must be greater than or equal to the bound.
- [Minimum range exclusive](_min-range-exclusive_date.md): The value must be greater than the bound.
- [Maximum range inclusive](_max-range-inclusive_date.md): The value must be less than or equal to the bound.
- [Maximum range exclusive](_max-range-exclusive_date.md): The value must be less than the bound.

It is possible to omit the minimum or maximum bound.

Out of range values are considered outliers.



------
```json
{
	"_normal-range_date": {
		"_min-range-inclusive_date": "1950",
		"_max-range-inclusive_date": "19591231"
	}
}
```

This *range* considers all dates greater than `1950` and smaller than `19591231` to be errors.
The range includes all dates, year, month or day, that are between 1950 and december 31st 1959, values out of this range are considered *outliers*.



```json
{
	"_normal-range_sdate": {
		"_min-range-exclusive_date": "19491231"
	}
}
```

This *range* considers all dates, year, month or day, starting from 1950 to be correct.
Values out of thus range are considered *outliers*.