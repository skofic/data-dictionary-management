### _rule



------
TITLE

------

#### Constraints section



------
DEFINITION

------

###### This object groups all properties whose function is to provide rules and constraints applying to object data structures in the data dictionary.



------
DESCRIPTION

------

All *terms* that *represent object structure definitions* require this element which features the following *ioptional* properties:

- [Required](_required): A [descriptors selection](_selection-descriptors) representing the selection of required properties.
- [Recommended](_recommended): A [descriptors selection](_selection-descriptors) representing the selection of recommended properties.
- [Banned](_banned): A list of properties that will be removed from the object prior to storing it.
- [Computed](_computed): A list of properties that will be automatically filled prior to storing the object.
- [Locked](_locked): The list of properties that cannot be modified by users.
- [Immutable](_immutable): The list of properties that cannot be modified once the object has been stored.
- [Default value](_default-value): A dictionary whose keys are the descriptor [global identifier](_gid) and the values are a [values selection](_selection-values).

This property is required for terms defining an object structure. This property can be empty, in which case it means that all the object's properties are optional.



------
EXAMPLES

------

```json
{
	"_rule": {
		"_required": {
			"_selection-descriptors_one": ["one", "two", "three"],
			"_selection-descriptors_any": ["red", "green", "blue"],
			"_selection-descriptors_all": ["mon", "tue", "wed"]
		},
		"_recommended": {
			"_selection-descriptors_any": ["thu", "fri"]
		},
		"_banned": ["sat", "sun"],
		"_computed": ["_key"],
		"_locked": ["_rev"],
		"_immutable": ["_key"],
		"_default-value": {
			"one": 1,
			"two": 2,
			"three": [1, 2, 3],
			"red": "It is red"
		}
	}
}
```

This rule requires the following conditions to be true:

- It must contain one of the following descriptors: `one`, `two` or `three`
- It must contain one or more of the following descriptors: `red`, `green` or `blue`.
- It must contain all of the following descriptors: `mon`, `tue` and `wed`.
- It is recommended to contain one or more of the following descriptors: `thu` and/or `fri`.
- It must not contain the following descriptors: `sat` and `sun`.
- The `_key` descriptor is computed.
- The `_rev` descriptor is locked: it cannot be modified.
- The `_key` descriptor's value is immutable.
- If omitted, the following descriptors will take the following values:
    - `one`: `1`
    - `two`: `2`
    - `three`: `[1, 2, 3]`
    - `red`: `"It is red"`