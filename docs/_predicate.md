### _predicate

------

#### Relationship predicate

------

###### Type or classification of the relationship.

------

A relationship predicate indicates the *type*, *nature* or *class* of a relationship. You may have several edges connecting the same nodes, but each edge must have a *different* predicate: this means that the combination of [subject](_from), predicate and [object](_to) must be unique.

Predicates are indicated as the [handle](_id) of the *document* that *identifies* the *relationship type*, By definition, predicates can be *any document*, but *this term* is itself also the *root* of a *controlled vocabulary* that *defines* all the *default relationship enumerations* of the *data dictionary*, which are used to define *controlled vocabularies*, *object data structures* and other generic *graphs*, these are the default predicates:

- [Enumeration of](_predicate_enum-of): The *subject* node is a *controlled vocabulary element* of the *object* node.
- [Property of](_predicate_property-of): The *subject* node is a *property* of the *object* node which represents a *data structure*.
- [Section of](_predicate_section-of): The *object* node is a *category* or *group* of the *subject* node.
- [Bridge of](_predicate_bridge-of): The *subject* node is an *alias* of the *object* node,