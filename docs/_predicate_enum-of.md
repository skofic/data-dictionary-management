### _predicate_enum-of



> TITLE
> 
> ------

#### Enumeration of



> DEFINITION
> 
> ------

###### The source node is a controlled vocabulary element of the destination node.



> DESCRIPTION
> 
> ------

The value is a *reference* to a *document* in the form of the document's [handle](_id).

The document must be a *controlled vocabulary type*, this means that it must be a *node* in a graph *related* with the [enumeration](_predicate_enum-of) [predicate](_predicate), whose root must be among the elements of the set.

When you select this [type](_type) you are *required* to include, in the descriptor definition, the data type [kind](_kind). This is a set of *controlled vocabulary types* or *term wildcards* to which the current descriptor's value must conform. Values defined by this type must belong to *at least one* element of the data [kind](_kind) set.