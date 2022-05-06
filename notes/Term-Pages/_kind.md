# _kind

Type reference

This field is a reference to a controlled vocabulary type term, or to an object data structure definition type term. In both cases it is the global identifier of the term that defines either of these two types.

This field is relevant only in the following cases:

- The [data type](_type_) is [enumeration](_type_enum): in that case you *must* reference the *controlled vocabulary type* by providing its term [global identifier](_gid). If you provide the wildcard term [any-term](_any-term), the value can be the [global identifier](_gid) of *any term*, if you provide the wildcard term [any-descriptor](_any-descriptor), the value can be the [global identifier](_gid) of *any descriptor*.
- The [data type](_type_) is [object](_type_object): in that case you *must* reference the *object data structure type* by providing its term [global identifier](_gid). If you provide the wildcard term [any-object](_any-object), the value can be the [global identifier](_gid) of any [object data structure definition](_type_object).