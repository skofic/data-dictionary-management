### _type_object



------
#### Object structure



------
###### Object data structure.



------
The descriptor value *must* be an *object* or *data structure*. The [data kind](_kind.md) can be used to *specify* the *structure type*: it is an array that contains *term references* to *[object structure types](_term_object.md)*, the *object* value will have to *satisfy* at least *one of the data kinds*. If you *omit* the *[data kind](_kind.md)*, it means that the object can have *any structure*, but also that its *properties*, *if they match a [descriptor](_term_descriptor.md) term*, *must abide the rules of the descriptor*.