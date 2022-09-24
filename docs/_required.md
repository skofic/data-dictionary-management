### _required



------
#### Required properties



------
###### Selection of required properties.



------
This field contains a *descriptors selection rule* that determines which *set* of *descriptors* must be *included* in the *data structure definition* of the *object* for it to be considered *valid*.

The *data type* of the selection *values* must be the *global identifier* of the *descriptors* that must be *included* in the *object data structure*.

In order for the *object data structure* to be *valid*, its *properties* must *include* the *elements* of this *selection*.



------
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