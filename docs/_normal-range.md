### _normal-range

------

#### Normal range of values

------

###### This field indicates the normal range for values, values that are out of range are considered outliers, not errors.

------

This field defines a *continuous numeric range* that represents the bounds *beyond which* values are considered *outliers*.

------

```json
{
	"_min-range-inclusive": 0.0,
	"_max-range-inclusive": 100.0
}
```

Values below `0.0` and greater than `100.0` are considered *outliers*, no value is considered errors.

```json
{
	"_min-range-inclusive": 0,
	"_max-range-inclusive": 100
}
```

Same as above, except that we use integers. Fractional values are allowed.

```json
{
	"_min-range-exclusive": 0
}
```

All values below `0` are considered outliers, no value is considered an error.