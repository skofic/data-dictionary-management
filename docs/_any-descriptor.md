### _any-descriptor



------
#### Any descriptor



------
###### This wildcard represents any descriptor.



------
When defining a [descriptor](_term_descriptor), if the [data type](_type) is [enumeration](_type_string_enum) and you set the [type reference](_kind.md) to this *value*, it means that the descriptor's value can be the [global identifier](_gid) of any *term* that represents a [descriptor](_term_descriptor.md). Terms that represent *descriptors* must *include* the [data](_data) property section.

When defining a [key reference](_type_string_key.md) type, you can add the [type reference](_kind.md) to the [data definition section](_data.md): if you set this value as one of the elements of the [data definition section](_data.md), you are signalling that the value, besides being a term reference, it has to be a reference to a term representing a [descriptor](_term_descriptor.md).