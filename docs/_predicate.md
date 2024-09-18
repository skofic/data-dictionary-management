### _predicate



------
#### Relationship predicate



------
###### Type or classification of the relationship.



------
A relationship predicate indicates the *type*, *nature* or *class* of a relationship. You may have several edges connecting the same nodes, but each edge must have a *different* predicate: this means that the combination of [subject](_from.md), *predicate* and [object](_to.md) must be unique.

Predicates are indicated as the [key](_key.md) of the *term* that *identifies* the *relationship type*. The predicate can be the document key of any term, although, this term is itself also the *root* of a *controlled vocabulary* that *defines* all the *default relationship enumerations* of the *data dictionary*, which are used to define *controlled vocabularies*, *object data structures* and other generic *graphs*, these are the default predicates:

- [Enumeration of](_predicate_enum-of.md): The [subject](_from.md) node is a *controlled vocabulary element* of the [object](_to.md) node.
- [Property of](_predicate_property-of): The [subject](_from.md) node is a *property* of the [object](_to.md) node which represents a [data structure](_type_object.md).
- [Section of](_predicate_section-of): The [object](_to.md) node is a *category* or *group* of the [subject](_from.md) node.
- [Bridge of](_predicate_bridge-of): The [object](_to.md) node graph passes through the [subject](_from.md) node, but the [subject](_from.md) node will not be a member of the [object](_to.md) node's graph.

This property is required in all [edges](_edge.md).