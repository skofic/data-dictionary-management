### _link



------
#### Link



------
###### Link data structure



------
*Links* are *edge objects* that define the *relationships* between nodes in a *directed graph*. These relationships are intended to have *one single depth level*, meaning that *only one path traverses the edge*. The link structure borrows all properties from [edges](_edge.md), except for the [path](_path.md) which is *not present here*.



------
Link example:

```json
{
	"_key": "20103dc79d7f368e2624a0f781c31e05",
	"_from": "terms/source_node",
	"_to": "terms/destination_node",
	"_predicate": "_predicate_requires_indicator",
	"_path_data": {"_name": "Custom data"}
}
```

This example represents a *link* indicating that `source_node` requires the indicator referenced by `destination_node`. The relationship holds a data record featuring the `_name` property.