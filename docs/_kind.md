### _kind



------
#### Data type references



------
###### This property is a set of term global identifiers representing term key references, enumeration types or object structure types, depending on the data type of the descriptor where it is used



------
This field is a [set](_set.md) of [global identifiers](_gid.md) which reference terms that represent [key references](_type_string_key.md), [controlled vocabularies](_type_string_enum.md) and [object data structures](_type_object.md). The field is relevant to the [data type](_type.md) of the current descriptor, in that it qualifies what values the current descriptor can hold. This field is relevant only to the following [data type](_type.md) values:

- [Key reference](_type_string_key.md): key references are strings representing *term global identifiers*, the *data kind* is ***required*** and can take *only* the following values:
  - [Any term](_any-term.md): The descriptor value can reference *any term* of the *terms collection*.
  - [Any enumeration](_any-enum.md): The descriptor value can reference *any term* that *represents* an *element of a controlled vocabulary*.
  - [Any structure](_any-object.md): The descriptor value can reference *any term* that contains the [rules section](_rule.md). This kind of term are used to represent *object structure types* or *definitions*
  - [Any descriptor](any-descriptor.md): The descriptor value can reference *any term* that contains the [data section](_data.md). This kind of term represents a *variable definition*, or *descriptor*.
- [Enumeration](_type_string_enum.md): enumerations represent *nested controlled vocabularies* organised in a graph, the *data kind* is ***required*** and can take the following values:
  - [Global identifier](_gid.md): It must be one or more [key references](_type_string_key.md) to *terms* that define a *controlled vocabulary type* or [path](_path.md), these are terms that are at the root of an emumeration graph connecting terms with the [enumeration](_predicate_enum-of.md) [predicate](_predicate.md). In this case the value must belong to at least one of the listed enumerations.
  - [Any term](_any-term.md): The value can reference *any term* in the *terms collection*.
- [Object](_type_object.md): the *data kind* must contain [key references](_type_string_key.md) to *term*s that define *data structure types*, the referenced terms *must include* the [rules section](_rule.md). This means that the value *must* *conform* to *at least one* of the referenced *structure definitions*. The *data kind* is ***required*** and the field can contain the following values:
  - [Global identifier](_gid.md): It must be one or more [key references](_type_string_key.md) to *terms* that define a *data structure type*, the term *must include* the [rules section](_rule.md). This means that the value *must* be an *object* of *that type*.
  - [Any structure](_any-object.md): The value can be an *object* of *any type*, but its *properties* will be *parsed* and *validated*. This means that only the *constraints* at the *object level* will be *ignored*.

This property contains a [set](_set.md) of choices, this means that a *value* is *valid* if it belongs to *at least one* of the listed choices. 

This property can only appear in the [scalar](_scalar.md), [set scalar](_set_scalar.md) and [dictionary key](_dict_key.md) container definitions that match the above [data types](_type.md).