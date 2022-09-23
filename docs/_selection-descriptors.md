### _selection-descriptors



> TITLE
> 
> ------

#### Descriptors selection



> DEFINITION
> 
> ------

###### Rule for the selection of descriptors, one can provide three lists: select one in the list, select any in the list, select all in the list.



> DESCRIPTION
> 
> ------

The structure has *three possible properties* and all properties have as *value* a *set* of *descriptor global identifiers*. At least one property must be provided and the set value must have at least one element.

- [One](_selection-descriptors_one): Only one element from the list.
- [Any](_selection-descriptors_any): One or more elements from the list.
- [All](_selection-descriptors_all): All elements from the list.

The combination of these three values represents the *selection of descriptors*.



> EXAMPLES
> 
> ------

```json
{
	"_selection-descriptors_one": [one, two, three],
	"_selection-descriptors_any": [red, green, blue],
	"_selection-descriptors_all": [mon. tue, wed]
}
```

This selection rule implies the following conditions:

- At least *one* of `[red, green, blue]` is required.
- *One* or *more* of `[odd, even] `are required.
- *All* of `[mon, tue, wed]` are required.

The following are valid:

- `[red, even, mon, tue, wed]`
- `[green, odd, mon, tue, wed]`
- `[blue, odd, even, mon, tue, wed]`

The following are invalid:

- `[even, mon, tue, wed]`
- `[green, mon, tue, wed]`
- `[blue, odd, even, tue, wed]`