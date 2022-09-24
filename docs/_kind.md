### _kind



------
#### Data type references



------
###### This property indicates the data type reference, it specifies to which enumeration or data structure the value must belong.



------
This field is a [set](_set.md) of [global identifiers](_gid.md) which reference terms that represent *root elements* of [controlled vocabularies](_type_string_enum.md), [object data structures](_type_object.md) and other kind of *graphs*. The field is relevant to the [data type](_type.md) of the current descriptor and is *required* and *restricted* to the following [data type](_type.md) values:

- [Key reference](_type_string_key.md): the *data kind* is required and can take the following values:
    - [Any term](_any-term.md): The value can reference *any term* in the *terms collection*.
    - [Any enumeration](_any-enum.md): The value can reference *any term* *belonging* to a *controlled vocabulary*, this means that the *term* must be *referenced* in at least one *edge* with the [enumeration](_predicate_enum-of.md) [predicate](_predicate.md).
    - [Any structure](_any-object.md): The value can reference *any term* that *defines* an *object data structure*: such terms must have the [rules section](_rule.md) property.
    - [Any descriptor](_any-descriptor.md): The value can reference *any term* that *defines* a *descriptor*: such terms must have the [data section](_data.md) property.
- [Enumeration](_type_string_enum.md): the *data kind* is *required* to indicate the *list* of *controlled vocabularies* to which the *value* must *belong*:
    - [Global identifier](_gid.md): It must be one or more [key references](_type_string_key.md) to *terms* that define a *controlled vocabulary type*, these are terms that are at the root of an emumeration graph connecting terms with the [enumeration](_predicate_enum-of.md) [predicate](_predicate.md). In this case the value must belong to at leas one of the listed enumerations.
    - [Any term](_any-term.md): The value can reference *any term* in the *terms collection*.
- [Object](_type_object.md): the *data kind* is *required*, it must contain [key references](_type_string_key.md) to *term*s that define *data structure types*, the referenced terms *must include* the [rules section](_rule.md). This means that the value *must* *conform* to *at least one* of the referenced *structure definitions*. This field can contain the following values:
    - [Global identifier](_gid.md): It must be one or more [key references](_type_string_key.md) to *terms* that define a *data structure type*, the term *must include* the [rules section](_rule.md). This means that the value *must* be an *object* of *that type*.
    - [Any structure](_any-object.md): The value can be an *object* of *any type*, but its *properties* will be *parsed* and *validated*. This means that only the *constraints* at the *object level* will be *ignored*.

This property contains a [set](_set.md) of choices, this means that a *value* is *valid* if it belongs to *at leas one* of the listed choices. 

This property can only appear in the [scalar](_scalar.md) container definition.