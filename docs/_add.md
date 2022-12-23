### _add



------
#### Add



------
###### Add or insert.



------
This term represents both a *controlled vocabulary option* of the [restrict](_restrict.md) property, when used within a [data section](_data.md) of a *descriptor*, or a *property* of a *structure definition*, when used in the [rule](_rule.md) section of an *object structure definition* term.

In both cases it will *restrict* the *action* of *inserting* a *variable* in a *record*, *adding* a *property* to a *structure*, or *adding* an *element* to a *list*.

When used as an *option* of the [restrict](_restrict.md) field in a *descriptor's* [data section](_data.md), it indicates that the *value* of the *property* can only be set at insert time, and cannot be added if the value was missing at insert time.

When used as a *field* in the [rule section](_rule.md) of an *object structure definition*, it will contain the *selection* of *properties* that can only be set at insert time, and that cannot be added after.

This is an example of a term that is used both as an enumeration and as a descriptor.



------
```json
{
	"_data": {
		"_scalar": {
			"_restrict": ["_add"],
			...
		}
	}
}
```

The above example describes a [scalar](_scalar.md) variable that can only be set at insert time, once the record has been stored, it will *not* be *possible* to *add* this *property*. It is, however, *possible* to [modify](_mod.md) its *value*, or [delete](_del.md) the *variable*.

```json
{
	"_data": {
		"_set": {
			"_restrict": ["_add"],
			"_set_scalar": {
				...
			}
		}
	}
}
```

The example above describes a [set](_set.md) variable that *cannot* be *added* to the *record* once the latter has been inserted. It is *possible*, however, to [replace](_mod.md) its *value* or [delete](_del.md) the *variable*. The list *elements* can be added, modified or deleted.

```json
{
	"_data": {
		"_set": {
			"_set_scalar": {
				"_restrict": ["_add"],
				...
			}
		}
	}
}
```

The example above describes a [set](_set.md) variable to which one *cannot add elements* once it has been inserted. It is possible, however, to [modify](_mod.md) and [delete](_del.md) the list *elements*. The *variable* can be *added* to an existing record, [replaced](_mod.md) with another value and [deleted](_del.md).

```json
{
	"_rule": {
		"_add": {
			"property1",
			"property2",
			"property3"
		},
		...
	}
}
```

The example above describes an *object structure* to which `property1`, `property2`, and `property3` *cannot* be *added* after its record has been *inserted*. The property *values*, however, can be [modified](_mod.md) and [deleted](_del.md).