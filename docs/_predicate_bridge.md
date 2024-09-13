### _predicate_bridge



------
#### Bridge predicate



------
###### Bridge predicates allow access to a graph by skipping a node



------
Edges have three types of predicates: *functional*, *container* and *bridge*.

*Bridge predicates* can be used to take advantage of an existing graph without needing to duplicate edges. An *existing edge root* can *point* to a *node* using a *bridge predicate*, doing so, the pointed node *becomes* the *root* of another *graph* that can take advantage of the existing graph edges by adding the bridged root to these edges path. This way, for instance, we can have an european countries graph that can take advantahe of the existing ISO 3166 world countries pointing only to the european countries and not needing to duplicate edges.