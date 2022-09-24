### _selection-terms_any-one



------
TITLE

------

#### Any one of



------
DEFINITION

------

###### The selection should include one element from each of list of sets and one or more of the elements from that selection will become the result.



------
DESCRIPTION

------

This descriptor contains a *parent array* that contains a *list* of *sets*: the rule determines that at most *one element* should be selected from *each* of the *child sets* and *one* or *more* elements of that selection will become the *result*. It is like combining an [any](_selection-terms_any) selection with a [one](_selection-terms_one) selection.

The *terms* in the *child sets* are represented by their [global identifiers](_gid).



------
EXAMPLES

------

```json
{
	"_selection-terms_any-one": [
		["red", "green", "blue"],
		["Monday", "Tuesday"]
	]
}
```

This example implements a selection of colours for Monday or Tuesday:

- In the *child sets* selection you choose *one* from each, that is: `red`, `green` or `blue` from the *first* set of colours and `Monday` or `Tuesday` fron the `second` weekdays set.
  
- Once the selection of elements in the *child sets* has been done, the result will become *one* or *more* elements of the *child sets selection*.
  

So some possible results could be:

- `["red", "Monday"]`
- `["green"]`
- `[Tuesday"]`
- `["blue", "Tuesday"]`