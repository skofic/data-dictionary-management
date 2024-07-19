### _predicate_requires_indicator



------
#### Requires indicator



------
###### The source node requires the destination node indicator.



------
This predicate indicates that the *source* node *requires* the *destination* node, and that the destination node is an *indicator*. This means that whenever we have the *source* node, we must also have the *destination* node.

This predicate is used to make sure dependent indicators are grouped together and required in a dataset. For instance we could link temperature to precipitation, ensuring that whenever we have temperature we will also include precipitation. In this case precipitation is considered as an indicator.