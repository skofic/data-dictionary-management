### _range



> TITLE
> 
> ------

#### Range of values



> DEFINITION
> 
> ------

###### This field indicates a range of values.



> DESCRIPTION
> 
> ------

This field defines a *continuous numeric range*.



> EXAMPLES
> 
> ------

```json
{
	  "_min-range-inclusive": 0.0,
	  "_max-range-inclusive": 100.0
}
```

This represents a *percentage range*, values are *greater* or *equal* to `0` and smaller or equal to `100`. Fractional values are allowed.

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

Values are greater than `0`. Fractional values are allowed.