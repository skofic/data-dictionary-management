### _any-object



> TITLE
> 
> ------

#### Any object



> DEFINITION
> 
> ------

###### This wildcard represents any object type.



> DESCRIPTION
> 
> ------

When defining a [descriptor](_term_descriptor), if the [data type](_type) is [object](_type_object) and you set the [type reference](_kind_) to this *value*, it means that the descriptor's *value* can be *any object structure*.

This means that the *object* can have *any property* and there are *no restrictions* or *constraints*, however, when *validating* the value, the object *will be parsed* and its *properties* will be *matched* to existing *descriptors*.