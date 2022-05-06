# _range_value

Value range

Object definition for a property defining a range.

This *property* represents a *numeric range*, it is an *object* that expects *one* or *two* properties that *define* the *lower* and/or *upper* range bounds:

- *Lower bound*, use *one* or *none* of the following:
    - [Minimum inclusive range](_min-range-inclusive): data must be *greater* than or *equal* to the value.
    - [Minimum exclusive range](_min-range-exclusive): data must be *greater* than the value.
- *Upper bound*, use *one* or *none* of the following:
    - [Maximum inclusive range](_max-range-inclusive): data must be *smaller* than or *equal* to the value.
    - [Maximum exclusive range](_max-range-exclusive): data must be *smaller* than the value.

Either the lower or upper bound can be *omitted* to create an *open range*.

The *numeric* value can be *discrete* or *continuous*, by default the value will be assumed to be a floating point number.

```json
{
  	"_min-range-inclusive": -2,
  	"_max-range-inclusive": 8
}
```

The number must be between `-2` and `8`.

```json
{
  	"_min-range-exclusive": 2,
  	"_max-range-exclusive": 8
}
```

The number must be between `3` and `7`.

```json
{
  	"_min-range-exclusive": 2.7,
  	"_max-range-inclusive": 3.7
}
```

The number must be larger than `2.7` and smaller or equal to `3.7`.

```json
{
  	"_max_range_exclusive": 10.0
}
```

The number must be smaller than `10.0`.