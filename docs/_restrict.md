### _restrict



------
#### Restrictions



------
###### Restrictions applied to variables and values.



------
This field can be used to list *restrictions* applying to record level *variables*, list *elements* and structure *properties*. The value is a *set* of *enumerations* that indicate the restrictions that apply to the descriptor. This variable can be placed at *several levels* in the [data section](_data.md) and, depending on which section contains this variable, the exact meaning of the enumeration changes:

In [scalar](_scalar.md) variables, or at the [array](_array.md) and [set](_set.md) level:

- [Add](_add.md): Cannot add the variable to an existing record.
- [Modify](_mod.md): Cannot modify the value once set.
- [Delete](_del.md): Cannot remove the variable from the record.

In the *scalar* section for [arrays](_scalar.md) and [sets](_set_scalar.md):

- [Insert](_add.md): Cannot add elements to the list.
- [Modify](_mod.md): Cannot modify element values.
- [Delete](_del.md): Cannot remove elements from the list.

These restrictions apply at the descriptor level, this means that they apply wherever these *properties* are stored. These attributes are also used in [data structure definitions](_rule.md), in that case we use a dictionary in which the *keys* are the *property names* and the *values* are the list of *restrictions*, that way it is possible to select to which properties these rules apply.



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

The above example describes a [scalar](_scalar.md) variable that can only be set at insert time, once the container has been stored, it will not be possible to [add](_add.md) this property.

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

The above example describes a [scalar](_scalar.md) variable that, once set, cannot be [modified](_mod.md). It can, however be [added](_add.md) or [deleted](_del.md).

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

The above example describes a [scalar](_scalar.md) variable that cannot be [deleted](_del.md). It can, however be [added](_add.md) and its value [modified](_mod.md).

```json
{
	"_data": {
		"_scalar": {
			"_restrict": ["_add", "_mod", "_del"],
			...
		}
	}
}
```

The above example describes a [scalar](_scalar.md) variable that cannot be [added](_add.md), its value cannot be [modified](_mod.md) and it also cannot be [deleted](_del.md). Typically, such values are *set* or *computed* at insert time.

```json
{
	"_data": {
		"_set": {
			"_restrict": ["_add"],
			"_set_scalar": {
				"_restrict": ["_mod", "_del"],
				...
			}
		}
	}
}
```

The above example describes a [set](_set.md) that cannot be [added](_add.md) to existing records, it must be created at insert time. Once created, its elements can only be [added](_add.md), it is forbidden to either [modify](_mod.md) or [remove](_del.md) elements.

```json
{
	"_data": {
		"_array": {
			"_restrict": ["_add", "_mod", "_del"],
			"_scalar": {
				...
			}
		}
	}
}
```

The above example describes an array that must be set in the record when it is inserted, and it is not allowed to add it once the record is stored. Once stored, its elements cannot be [changed](_mod.md).