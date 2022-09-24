### _predicate_bridge-of



------
TITLE

------

#### Bridge of



------
DEFINITION

------

###### The source node is a bridge to the destination node.



------
DESCRIPTION

------

This predicate indicates that the *source* node acts as a *bridge* to the *destination* node. This means that the *source* of such relationship should be *hidden* or *skipped* when *traversing* the *path*. Edges with this predicate are found in two scenarios. To allow a *new enumeration root* to *take advantage* of the network belonging to an *existing controlled vocabulary root*, or to *enforce* the *selection* of a *preferred* or *default* element different than the search target.



------
EXAMPLES

------

Suppose you have a controlled vocabulary that is exhaustive and has a large number of elements, you want to create a new controlled vocabulary that shares most, but not all the elements of the first enumeration. You normally would need to duplicate the graph nodes and edges and connect them to the new root. By making the old root a bridge to the new root and by adding the new root to the *path* to all relevant edges, it will appear that all the relevant elements belong directly to the new root.

Suppose you have two controlled vocabularies that classify the same information, but enumeration A is partial, while enumeration B is exhaustive. If you want to enforce the use of enumeration B, even passing through enumeration A, you can connect controlled vocabulary A elements with the bridge predicate and connect the related enumeration B elements wuth the *enumeration* predicate. This way when you search for an element in enumeration A, you will get back the corresponding element of enumeration B.