### _default-value



------
TITLE

------

#### Default value



------
DEFINITION

------

###### List of property default values.



------
DESCRIPTION

------

This field is a *key/value dictionary* in which the *key* is the *property name*, which is the *global identifier* of the *descriptor*, and the *value* represents the *default value* for that *property*.

The data is defined as an object that can have any property or value: default values are added before validation, so values and descriptors will follow standard rules.



------
EXAMPLES

------

```json
{
	"my_number": 12,
	"my_label": "default label",
	"my_list": [1, 2, 3]
}
```

This will set:

- `my_number` to 12.
- `my_label` to `"default label"`.
- `my_list` to `1`, `2` and `3`.