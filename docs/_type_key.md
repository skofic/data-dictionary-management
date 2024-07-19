### _type_key



------
#### Key data type



------
###### The data type of a key.



------
This field defines the data type of a *dictionary key*, it is an [enumerated](_type_string_enum.md) choice that can take the following values:

- [String](_type_string.md): A *character* or *text* encoded in UTF-8. The [data section](_data.md) can include the [regular expression](_regexp.md) property.
- [Key reference](_type_string_key.md): A [string](_type_string.md) representing the [global identifier](_gid.md) of a *term*. The [data section](_data.md) is *required* to include the [data kind](_kind.md) field which specifies the *kind of term*, these are the allowed choices:
    - [Any term](_any-term.md): The value can reference *any document* in the *terms collection*.
    - [Any enumeration](_any-enum.md): The value can reference *any term* *belonging* to a *controlled vocabulary*, this means that the *term* must be *referenced* in at least one *edge* with the [enumeration](_predicate_enum-of.md) [predicate](_predicate.md).
    - [Any structure](_any-object.md): The value can reference *any term* that *defines* an *object data structure*: such terms must include the [rules section](_rule.md) property.
    - [Any descriptor](_any-descriptor.md): The value can reference *any term* that *defines* a *descriptor*: such terms must have the [data section](_data.md) property.
- [Enumeration](_type_string_enum.md): A [string](_type_string.md) representing the [global identifier](_gid.md) of a *document* belonging to the *terms collection* that is a member of a *controlled vocabulary*. The [data section](_data.md) can include the following properties: [format](_format.md), [unit](_unit.md), [unit name](_unit-name.md) and [regular expression](_regex-mdp). In addition, the [data section](_data.md) *requires* the [data kind](_kind.md) field, that is *must* *specify* from which *controlled vocabulary* the value must be *chosen*.

When validating dictionary types, the *key* and *value* parts are *parsed* and *validated independently*, dictionary keys are not considered descriptors.