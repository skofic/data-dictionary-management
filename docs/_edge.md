### _edge



------
TITLE

------

#### Edge



------
DEFINITION

------

###### Edge data structure



------
DESCRIPTION

------

*Edges* are *objects* that define the *relationships* between nodes in a *directed graph*. This data structure is implemented using the [ArangoDB](https://www.arangodb.com) edge record, in particular:

- The [key](_key) property is required and should be the MD5 hash of the *concatenation* of the [source term reference](_from) , [predicate](_predicate) and [destination term reference](_to) properties separated by a slash (`/`) token. This means that there can be only one edge connecting the source and destination nodes with a specific predicate.
- The [predicate](_predicate) property is required, it indicates the nature or function of the relationship.
- The [path](_path) property is also required in order to allow more than one path to share the same source, predicate and destination combination.



------
EXAMPLES

------

Edge example:

```json
{
	"_key": "20103dc79d7f368e2624a0f781c31e05",
	"_from": "terms/source_node",
	"_to": "terms/destination_node",
	"_predicate": "_edge_predicate_enum-of",
	"_path": ["destination_node", "other_node"]
}
```

This example represents an *edge* that connects `source_node` to `destination_node` making `source_node` an *enumeration element* of the `destination_node` *controlled vocabulary*. Two controlled vocabularies share this relationship: `destination_node` and `other_node`.