### _kind



------
#### Data type references



------
###### This property is used in the data section of a descriptor, it is a set of references to terms that represent enumeration types, object structure types and term wildcards, depending to which data type it is applied



------
This field is a [set](_set.md) of [global identifiers](_gid.md) which reference terms that represent *enumeration types*, *object structure types* and *term wildcards*. The field is relevant to the [data type](_type.md) of the current descriptor, in that it qualifies what values the current descriptor allows. This field is relevant only to the following [data type](_type.md) values:

- [Key reference](_type_string_key.md): key references are strings representing *term global identifiers*, the *data kind* is ***optional***, if provided it can take *only* the following values:
  - [Any term](_any-term.md): The descriptor value can reference *any term* of the *terms collection*.
  - [Any enumeration](_any-enum.md): The descriptor value can reference *any term* that *represents* an *element of a controlled vocabulary*.
  - [Any structure](_any-object.md): The descriptor value can reference *any term* that contains the [rules section](_rule.md). This kind of term are used to represent *object structure types* or *definitions*
  - [Any descriptor](any-descriptor.md): The descriptor value can reference *any term* that contains the [data section](_data.md). This kind of term represents a *variable definition*, or *descriptor*.
- [Enumeration](_type_string_enum.md): enumerations represent *nested controlled vocabularies* organised in a graph, the *data kind* is ***optional***.
  - If *provided* it should contain *references* to the *enumeration types* to which the current *enumeration element* must *belong* to: there needs to be at least one match.
  - If is *omitted*, the term reference can point to an *element* of *any enumeration graph*.
- [Object](_type_object.md):
  - If *provided*, the *data kind* must contain [key references](_type_string_key.md) to *terms* that define *[data structure types](_term_object.md)*, which are *terms* that *feature* the [rule section](_rule.md) which contains the directives determining which *properties* the *object* *must* or *must not* have.
  - If *omitted*, the object can have *any structure*. It can also have *any property*, but if any *property matches a descriptor*, the *value* must *match* the *descriptor's directives*. If the property does not match a term, the value can be of any type.

This property contains a [set](_set.md) of choices, this means that a *value* is *valid* if it belongs to *at least one* of the listed choices. 

This property can only appear in the [scalar](_scalar.md), [set scalar](_set_scalar.md) and [dictionary key](_dict_key.md) container definitions that match the above [data types](_type.md).