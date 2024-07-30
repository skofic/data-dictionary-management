### _type_string_enum



------
#### Enumeration



------
###### Global identifier of a term belonging to a controlled vocabulary.



------
It is a [string](_type_string.md) representing the [global identifier](_gid.md) of a *document* from the *terms collection*. This term *must* be an *element* of a *specific controlled vocabulary*, which is a *graph* of *term nodes* related with the [enumeration](_predicate_enum-of.md) [predicate](_predicate).

The [data section](_data.md) of the [descriptor term](_term_descriptor.md) also expects an optional [data kind](_ind.md) property, it is an *array* of *references* to *terms* that represent *enumeration types*: it allows you to select *to which enumerations* the *current value must belong*. If you omit the data kind, it means that the *value* must be a *reference* to an *element* of *any enumeration graph*.