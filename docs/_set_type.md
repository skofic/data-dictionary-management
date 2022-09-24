### _set_type



> TITLE
> 
> ------

#### Set elements data type



> DEFINITION
> 
> ------

###### The data type of the elements of a set.



> DESCRIPTION
> 
> ------

This property is used to define the *data type* of [set](_set.md) *elements*, these are the allowed values:

- [Boolean](_type_boolean.md): *True* or *false* value.
- [Integer](_type_integer.md): *Numeric discrete* value. The [data section](_set_scalar.md) can include the following properties: [unit](_unit.md), [unit name](_unit-name.md), [range](_range.md), [valid range](_valid-range.md) and [normal range](_normal-range.md).
- [Numeric](_type_number.md): *Numeric discrete* or *continuous* value; will be considered a *floating point number*. The [data section](_set_scalar.md) can include the following properties: [unit](_unit.md), [unit name](_unit-name.md), [range](_range.md), [valid range](_valid-range.md) and [normal range](_normal-range.md).
- [Time-stamp](_type_number_timestamp.md): A [numeric](_type_number.md) Unix Timestamp, it is used to indicate a *precise moment in time*. The [data section](_set_scalar.md) can include the following properties: [range](_range.md), [valid range](_valid-range.md) and [normal range](_normal-range.md).
- [String](_type_string.md): A *character* or *text* encoded in UTF-8. The [data section](_set_scalar.md) can include the following properties: [format](_format.md), [unit](_unit.md), [unit name](_unit-name.md) and [regular expression](_regexp.md).
- [Key reference](_type_string_key.md): A [string](_type_string.md) representing the [global identifier](_gid.md) of a *document* from the *terms collection*. The [data section](_set_scalar.md) is *required* to include the [data kind](_kind.md) field which specifies the *kind of term*, these are the allowed choices:
    - [Any term](_any-term.md): The value can reference *any term* in the *terms collection*.
    - [Any enumeration](_any-enum.md): The value can reference *any term* *belonging* to a *controlled vocabulary*, this means that the *term* must be *referenced* in at least one *edge* with the [enumeration](_predicate_enum-of.md) [predicate](_predicate.md).
    - [Any structure](_any-object.md): The value can reference *any term* that *defines* an *object data structure*: such terms must have the [rules section](_rule.md) property.
    - [Any descriptor](_any-descriptor.md): The value can reference *any term* that *defines* a *descriptor*: such terms must have the [data section](_data) property.
- [Document handle](_type_string_handle.md): A [string](_type_string.md) representing the [document handle](_id.md) of a *record* belonging to *any collection*. No other [data section](_set_scalar.md) properties are expected.
- [Enumeration](_type_string_enum.md): A [string](_type_string.md) representing the [global identifier](_gid.md) of a *document* belonging to the *terms collection* that is part of a *controlled vocabulary*. The [data section](_set_scalar.md) can include the following properties: [format](_format.md), [unit](_unit.md), [unit name](_unit-name.md) and [regular expression](_regexp.md). In addition, the [data section](_set_scalar.md) *requires* the [data kind](_kind.md) field, that is *must* *specify* from which *controlled vocabulary* the value must be *chosen*.

The [set](_set.md) container *requires* this property.