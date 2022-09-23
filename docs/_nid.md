### _nid



> TITLE
> 
> ------

#### Namespace identifier



> DEFINITION
> 
> ------

###### A reference to the term that represents the namespace of the current item, the value is the term global identifier.



> DESCRIPTION
> 
> ------

Namespaces are used to *group terms* under a common *category*, and to *disambiguate* [local identifiers](_lid). The namespace is *concatenated* to the [local identifier](_lid) to form the [global identifier](_gid) that is the *unique identifier* of the *term* in the *data dictionary*.

Besides the above behaviour, if the namespace of an [object definition term](_term_object) is also an [object definition term](_term_object), the *rules* and *constraints* of the *namespace* are passed on to the *current term*, this implements a sort of *class inheritance*.

The *value* of this field can be the [global identifier](_gid) of *any term*.



> EXAMPLES
> 
> ------

`iso_3166_1` is the global identifier of the term that represents the ISO country codes controlled vocabulary: it is a concatenation of the following namespaces:

- `iso`: The International Standards Organisation (ISO) root namespace.
- `3166`: Codes for the representation of names of countries and their subdivisions.
- `1`: Part 1: Country codes.