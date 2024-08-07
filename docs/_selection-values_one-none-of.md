### _selection-values_one-none-of



------
#### Any one of



------
###### The selection should include one element from each of list of sets and one or more of the elements from that selection will become the result.



------
This descriptor contains a *parent array* that contains a *list* of *sets*: the rule determines that at most *one element* should be selected from *each* of the *child sets* and *one* or *more* elements of that selection will become the *result*. It is like combining an [any](_selection-valuesany) selection with a [one](_selection-values_one) selection.

The *values* in the *child sets* can be any value.



------
```json
{
	"_selection-terms_one-none-of": [
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