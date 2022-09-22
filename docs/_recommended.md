### _recommended

------

#### Recommended properties

------

###### Selection of recommended properties.

------

This field contains a *descriptors selection rule* that determines which *set* of *descriptors* are *recommended* to be *included* in the *data structure definition* of the *object*. By recommended it means that you are strongly encouraged to include the selection of properties in the object.

The *data type* of the selection *values* must be the *global identifier* of the *descriptors* that are *recommended*.

If these properties are not added to the object this doesn't mean that the object is invalid.

------

```json
	"_selection-descriptors_one": [one, two, three],
	"_selection-descriptors_any": [red, green, blue],
	"_selection-descriptors_all": [mon. tue, wed]
}
```

This selection rule implies the following conditions:

- At least *one* of `[red, green, blue]` is recommended.
- *One* or *more* of `[odd, even] `are recommended.
- *All* of `[mon, tue, wed]` are recommended.