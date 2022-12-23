### _mod



------
#### Modify



------
###### Change or modify.



------
This term represents both a *controlled vocabulary option* of the [restrict](_restrict.md) property, when used within a [data section](_data.md) of a *descriptor*, or a *property* of a *structure definition*, when used in the [rule](_rule.md) section of an *object structure definition* term.

In both cases it will *restrict* the *action* of *modifying* the *value* of a variable, *modifying* the *contents* of a *structure*, or *modifying* the *elements* of a *list*.

When used as an *option* of the [restrict](_restrict.md) field in a *descriptor's* [data section](_data.md), it indicates that the *value* of the *property* cannot be modified once set.

When used as a *field* in the [rule section](_rule.md) of an *object structure definition*, it will contain the *selection* of *properties* whose values cannot be modified once set.

This is an example of a term that is used both as an enumeration and as a descriptor.



------
```json
{
	"_data": {
		"_scalar": {
			"_restrict": ["_mod"],
			...
		}
	}
}
```

The above example describes a [scalar](_scalar.md) variable whose *value*, once set, *cannot* be *modified*. It is, however, *possible* to [add](_add.md) or, or [delete](_del.md) the *property*.

```json
{
	"_data": {
		"_set": {
			"_restrict": ["_mod"],
			"_set_scalar": {
				...
			}
		}
	}
}
```

The example above describes a [set](_set.md) variable whose *value*, once set, *cannot* be *modified*. It is *possible*, however, to [add](_add.md) or [delete](_del.md) the *variable*. The list *elements* can be added, modified or deleted.

```json
{
	"_data": {
		"_set": {
			"_set_scalar": {
				"_restrict": ["_mod"],
				...
			}
		}
	}
}
```

The example above describes a [set](_set.md) variable whose element values cannot be modified. It is possible, however, to [add](_add.md) and [delete](_del.md) list *elements*. The *variable* can be [added](_add.md) to an existing record, *replaced* with another value and [deleted](_del.md).

```json
{
	"_rule": {
		"_mod": {
			"property1",
			"property2",
			"property3"
		},
		...
	}
}
```

The example above describes an *object structure* in which the value of `property1`, `property2`, and `property3` *cannot* be *modified*. These *properties*, however, can be [added](_add.md) and [deleted](_del.md).