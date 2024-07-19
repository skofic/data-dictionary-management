### _predicate_bridge-of



------
#### Bridge of



------
###### The source node is a bridge to the destination node.



------
This predicate indicates that the *source* node acts as a *bridge* to the *destination* node. This means that the *source* of such relationship should be *hidden* or *skipped* when *traversing* the *path*.

Edges with this predicate are found in both enumeration and structure graphs. With enumerations it is used to allow a *new enumeration root* to *take advantage* of the network belonging to an *existing controlled vocabulary root*, or to *enforce* the *selection* of a *preferred* or *default* element different than the search target. In this case you would create a *bridge edge* with the *existing root* in the `_from`, and the *new root* in the `_to`. With structures such an edge is used to connect the structure data type to its property: in this case you would set the `_from` with the structure *data type* and the `_to` with the *property* of that type.



------
Suppose you have a controlled vocabulary that is exhaustive and has a large number of elements, you want to create a new controlled vocabulary that shares most, but not all the elements of the first enumeration. You normally would need to duplicate the graph nodes and edges and connect them to the new root. By making the old root a bridge to the new root and by adding the new root to the *path* to all relevant edges, it will appear that all the relevant elements belong directly to the new root.

Suppose you have two controlled vocabularies that classify the same information, but enumeration A is partial, while enumeration B is exhaustive. If you want to enforce the use of enumeration B, even passing through enumeration A, you can connect controlled vocabulary A elements with the bridge predicate and connect the related enumeration B elements wuth the *enumeration* predicate. This way when you search for an element in enumeration A, you will get back the corresponding element of enumeration B.

Suppose you have a *data type* that defines a *structure*: you would create a *series of edges* to link the structure *properties* to the *data type* by setting the *property* in the `_from`, the *data type* in the `_to` and the `_predicate_property-of` *predicate* in the `_predicate` field. You would then create an edge linking the *data type* to the desired *root property* with the *data type* in the `_from`, the *root property* in the `_to` and use the `_predicate_bridge-of` in the `_predicate`. When traversing this graph the data type will be ignored.