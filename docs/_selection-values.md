### _selection-values



> TITLE
> 
> ------

#### Values selection



> DEFINITION
> 
> ------

###### Rule for the selection of values, one can provide three lists: select one in the list, select any in the list, select all in the list.



> DESCRIPTION
> 
> ------

The structure has *three possible properties* whose *data* is a *set* of *values* of *any type*. At least one property must be provided and the set value must have at least one element.

- [One](_selection-terms_one): Only one element from the list.
- [Any](_selection-terms_any): One or more elements from the list.
- [All](_selection-terms_all): All elements from the list.

The combination of these three values represents the *selection of values*.



> EXAMPLES
> 
> ------

```json
{
	"_selection-values_one": [one, two, three],
	"_selection-values_any": [true, false],
	"_selection-values_all": [1. 2, 3]
}
```

This selection rule implies the following conditions:

- At least *one* of `[one, two, three]` is required.
- *One* or *more* of `[true, false] `are required.
- *All* of `[1. 2, 3]` are required.

The following are valid:

- `[one, true, 1, 2, 3]`
- `[two, false, 1, 2, 3]`
- `[three, true, false, 1, 2, 3]`

The following are invalid:

- `[false, 1, 2, 3]`
- `[two, 1, 2, 3]`
- `[three, true, false, 2, 3]`