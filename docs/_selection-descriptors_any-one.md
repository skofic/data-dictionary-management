### _selection-descriptors_any-one



> TITLE
> 
> ------

#### Any one of



> DEFINITION
> 
> ------

###### The selection should include one or no element from each of list of sets, the result should have at least one element.



> DESCRIPTION
> 
> ------

This descriptor contains a *list* of *sets*: the rule determines that at most *one element* should be selected from *each* of the *child sets* and *one* or *more* elements of that selection will become the *result*.

The *descriptors* in the *child sets* are represented by their [global identifiers](_gid).



> EXAMPLES
> 
> ------

```json
{
	"_selection-descriptors_any-one": [
		["minimum_inclusive", "minimum_exclusive"],
		["maximum_inclusive", "maximum_exclusive"]
	]
}
```

This example implements a selection for a range:

- In the *child sets* selection you choose *one* from each, that is: `minimum_inclusive` or `minimum_exclusive` from the *first* set and `maximum_inclusive` or `maximum_exclusive` fron the `second` set.
- Once the selection of elements in the *child sets* has been done, the result will become *one* or *more* elements of the *child sets selection*.

So the possible results could be:

- `["minimum_inclusive"]`
- `["minimum_exclusive"]`
- `["maximum_inclusive"]`
- `["maximum_exclusive"]`
- `["minimum_inclusive", "maximum_inclusive"]`
- `["minimum_inclusive", "maximum_exclusive"]`
- `["minimum_exclusive", "maximum_inclusive"]`
- `["minimum_exclusive", "maximum_exclusive"]`