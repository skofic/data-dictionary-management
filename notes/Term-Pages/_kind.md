# _kind

Type reference

This field is a reference to a set of controlled vocabulary type terms, or to object data structure definition type terms. In both cases it is the global identifier of the term that defines either of these two types.

This field is relevant only in the following cases:

- The [data type](_type_) is [enumeration](_type_enum): in that case you *must* reference the *controlled vocabulary type* by providing its term [global identifier](_gid). If you provide the wildcard term [any-term](_any-term), the value can be the [global identifier](_gid) of *any term*, if you provide the wildcard term [any-descriptor](_any-descriptor), the value can be the [global identifier](_gid) of *any descriptor*. A term that represents a controlled vocabulary is the *root* node of a directed graph in which at least one element is related with the [enumeration-of](_predicate_enum-of) [predicate](_predicate).
- The [data type](_type_) is [object](_type_object): in that case you *must* reference the *object data structure type* by providing its term [global identifier](_gid). If you provide the wildcard term [any-object](_any-object), the value can be the [global identifier](_gid) of any [object data structure definition](_type_object). A term that represents an object data structure definition is the *root* node of a directed graph in which at least one element is related with the [property-of](_predicate_enum-of) [predicate](_predicate).

The value is a set, this means that you can match enumerations in more than one controlled vocabulary and objects in more than one structure definition.
