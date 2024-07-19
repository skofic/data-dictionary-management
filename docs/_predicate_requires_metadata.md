### _predicate_requires_metadata



------
#### Requires metadata



------
###### The source node requires the destination node metadata.



------
This predicate indicates that the *source* node *requires* the *destination* node, and that the destination node is *metadata*. This means that whenever we have the *source* node, we must also have the *destination* node, and that the *destination* node is to be considered *metadata* of the source node.

This predicate is used to make sure the source node includes the required metadata.  For instance we could link temperature to measurement type, ensuring that whenever we have temperature we will also include the method used to measure it. In this case the method is considered metadata.