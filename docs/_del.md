### _del



------
#### Delete



------
###### Delete or remove.



------
This term represents both a *controlled vocabulary option* of the [restrict](_restrict.md) property, when used within a [data section](_data.md) of a *descriptor*, or a *property* of a *structure definition*, when used in the [rule](_rule.md) section of an *object structure definition* term.

In both cases it will *restrict* the *action* of *removing* a *variable* from a *record*, *removing* a *property* from a *structure*, or *deleting* an *element* from a *list*.

When used as an *option* of the [restrict](_restrict.md) field in a *descriptor's* [data section](_data.md), it indicates that the *value* of the *property* cannot be deleted.

When used as a *field* in the [rule section](_rule.md) of an *object structure definition*, it will contain the *selection* of *properties* whose values cannot be deleted.

This is an example of a term that is used both as an enumeration and as a descriptor.



------
```json
{
	"_data": {
		"_scalar": {
			"_restrict": ["_del"],
			...
		}
	}
}
```

The above example describes a [scalar](_scalar.md) variable that, once set, *cannot* be *deleted*. It is, however, *possible* to [add](_add.md) it or, or [modify](_mod.md) its *value*.

```json
{
	"_data": {
		"_set": {
			"_restrict": ["_del"],
			"_set_scalar": {
				...
			}
		}
	}
}
```

The example above describes a [set](_set.md) variable that, once set, *cannot* be *deleted*. It is *possible*, however, to [add](_add.md) the *variable* or [replace](_mod.md) its *value*. The list *elements* can be added, modified or deleted.

```json
{
	"_data": {
		"_set": {
			"_set_scalar": {
				"_restrict": ["_del"],
				...
			}
		}
	}
}
```

The example above describes a [set](_set.md) variable whose *elements* cannot be *deleted*. It is possible, however, to [add](_add.md) and [modify](_mod.md) list *elements*. The *variable* can be [added](_add.md) to an existing record, [replaced](_mod.md) with another value and *deleted*.

```json
{
	"_rule": {
		"_del": {
			"property1",
			"property2",
			"property3"
		},
		...
	}
}
```

The example above describes an *object structure* in which the value of `property1`, `property2`, and `property3` *cannot* be *deleted*. These *properties*, however, can be [added](_add.md) and their values [modified](_mod.md).