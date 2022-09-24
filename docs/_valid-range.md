### _valid-range



------
TITLE

------

#### Valid range of values



------
DEFINITION

------

###### This field indicates the allowed range for values, values that are out of range are considered errors.



------
DESCRIPTION

------

This field defines a *continuous numeric range* within which values are considered *correct*; values *out* of this *range* are considered *errors*.



------
EXAMPLES

------

```json
{
	"_min-range-inclusive": 0.0,
	"_max-range-inclusive": 100.0
}
```

This represents a *percentage range*, values must be *greater* or *equal* to `0` and must be smaller or equal to `100`. Fractional values are allowed. `0.0` is *correct*, `100` is *correct*, `101` is *incorrect* and `-0.1` is *incorrect*.

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

Values must be greater than `0`. Fractional values are allowed. `0` is *incorrect*, `1` is *correct*, `2.5` is *correct*, `-0.01` is *incorrect*.