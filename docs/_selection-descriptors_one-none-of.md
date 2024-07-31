### _selection-descriptors_one-none-of



------
#### One of any in list



------
###### The selection should include one or no element from each of the list of sets



------
This descriptor contains a *list* of *sets*: the rule determines that *one element*, or *no elements* should be selected from *each* of the *child sets*.

The *descriptors* in the *child sets* are represented by their [global identifiers](_gid.md).



------
```json
{
	"_selection-descriptors_one-none-of": [
		["minimum_inclusive", "minimum_exclusive"],
		["maximum_inclusive", "maximum_exclusive"]
	]
}
```

This example implements a selection for a range:

- In the *child sets* selection you choose *one* or *none* from each, that is: `minimum_inclusive` or `minimum_exclusive` or *none* from the *first* set and `maximum_inclusive` or `maximum_exclusive` or *none* fron the `second` set.
- The final selection of elements must include *at least one choice*.

So the possible results could be:

- `["minimum_inclusive"]`
- `["minimum_exclusive"]`
- `["maximum_inclusive"]`
- `["maximum_exclusive"]`
- `["minimum_inclusive", "maximum_inclusive"]`
- `["minimum_inclusive", "maximum_exclusive"]`
- `["minimum_exclusive", "maximum_inclusive"]`
- `["minimum_exclusive", "maximum_exclusive"]`