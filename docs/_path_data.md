### _path_data



------
#### Paths data



------
###### An object containing custom data referring to the relationship



------
Relationships in a graph are implemented using [edges](_edge.md). These are uniquely identified by their [subject](_from.md)-[predicate](_predicate.md)-[object](_to.md) combination, there cannot be two edges sharing the same combination. The edge [path](_path.md) property indicates which graph *root* [nodes](_id.md) have a path *traversing* the *current edge*.

You can use this property to store data that can be used during graph traversals to characterise the [subject](_from.md)-[predicate](_predicate.md)-[object](_to.md) combination, the [path](_path.md) elements or other related items.

The thing to keep in mind id that the [edge](_edge.md) is shared by all the graphs that are represented in the [path](_path.md), so *one strategy* could be to use *this property* as a *key/value dictionary* in which the *key matches* an *element of the [path](_path.md)* and the *value* contains the *data characterising* the *relationship in that path*.



------
```json
{
	"_key": "<edge hash>",
	"_from": "locations/Roma",
	"_predicate": "_predicate_travel-to",
	"_to": "locations/Milano",
	"_path": [
		"airlines/airline-A",
		"airlines/airline-B"
	],
	"_path_data": {
		"airlines/airline-A": {
			"price": 150,
			"duration": 75
		},
		"airlines/airline-B": {
			"price": 200,
			"duration": 45
		}
	}
}
```

The above example describes an edge representing the travel route from *Rome* to *Milan* that is provided by *two airlines*: *airline-A* and *airline-B*. *Airline-A* offers the trip with a *price* of *150* for a travel *duration* of *75*, while *airline-B* offers the trip with a *cost* of *200* and a *duration* of *45*.

```json
{
	"_key": "<edge hash>",
	"_from": "locations/Roma",
	"_predicate": "_predicate_travel-to",
	"_to": "locations/Milano",
	"_path": [
		"airlines/airline-A",
		"airlines/airline-B"
	],
	"_path_data": {
		"airlines/airline-A": {
			"price": 150,
			"duration": 75
		},
		"airlines/airline-B": {
			"price": 200,
			"duration": 45
		},
		"locations/Roma": {
			"taxi": 70,
			"duration": 45
		},
		"locations/Milano": {
			"taxi": 90,
			"duration": 30
		},
		"passengers": 1247
	}
}
```

While path data should reference each edge path element, it is possible to add references to other items to set data that applies to the current edge as a whole in relation to the dictionary key.

The above example is a copy of the previous example: besides the airline data here we have data for the departure location and data for the arrival location that will apply regardless of the airline. In Rome the taxi will cost 70 and the trip will last 45, while in Milan the taxi will cost 90 and the trip will last 30 minutes.

So the total cost of the trip with airline-A will be 310 and the duration will be 150, while the total cost of the trip with airline-B will be 360 and the duration will be 120.

The above example also contains data that is not related to any elements of the edge: it records the number of passengers having taken that route using any of the two airlines.

```json
{
	"_key": "<edge hash>",
	"_from": "locations/Roma",
	"_predicate": "_predicate_travel-to",
	"_to": "locations/Milano",
	"_path": [
		"airlines/airline-A",
		"airlines/airline-B"
	],
	"_path_data": {}
}
```

Path data is not required, however, dictionary services will create this property by default as an empty object.