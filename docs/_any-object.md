### _any-object



------
#### Any object



------
###### This wildcard represents any object type.



------
When defining a [descriptor](_term_descriptor), if the [data type](_type) is [object](_type_object) and you set the [type reference](_kind.md) to this *value*, it means that the descriptor's *value* can be *any object structure*. This means that the *object* can have *any property* and there are *no restrictions* or *constraints*, however, when *validating* the value, the object *will be parsed* and its *properties* will be *matched* to existing *descriptors*.

When defining a [key reference](_type_string_key.md) type, you can add the [type reference](_kind.md) to the [data definition section](_data.md): if you set this value as one of the elements of the [data definition section](_data.md), you are signalling that the value, besides being a term reference, it has to be a reference to a term representing an [object structure](_term_object.md).