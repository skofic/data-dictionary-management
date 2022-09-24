### gcu_polygon



------
TITLE

------

#### GCU polygon



------
DEFINITION

------

###### Shape of the gene conservation unit.



------
DESCRIPTION

------

The field is a GeoJSON geometry structure that records the shape of the gene conservation unit. The shape can be a polygon or multipolygon.



------
EXAMPLES

------

Here is an example with no holes:

```json
{
	"type": "Polygon",
		"coordinates": [
		[
			[100.0, 0.0],
			[101.0, 0.0],
			[101.0, 1.0],
			[100.0, 1.0],
			[100.0, 0.0]
		]
	]
}
```

Here is an example with a hole:

```json
{
	"type": "Polygon",
	"coordinates": [
		[
			[100.0, 0.0],
			[101.0, 0.0],
			[101.0, 1.0],
			[100.0, 1.0],
			[100.0, 0.0]
		],
		[
			[100.8, 0.8],
			[100.8, 0.2],
			[100.2, 0.2],
			[100.2, 0.8],
			[100.8, 0.8]
		]
	]
}
```