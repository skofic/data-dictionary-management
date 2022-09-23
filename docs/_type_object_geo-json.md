### _type_object_geo-json



> TITLE
> 
> ------

#### GeoJSON geometry



> DEFINITION
> 
> ------

###### Geospatial shape.



> DESCRIPTION
> 
> ------

This data type represents the `geometry` property of a GeoJSON geometry structure. GeoJSON is a geospatial data format based on JSON. It defines several different types of JSON objects and the way in which they can be combined to represent data about geographic shapes on the Earth surface. GeoJSON uses a geographic coordinate reference system, World Geodetic System 1984 (WGS 84), and units of decimal degrees.

This `geometry` object has two required properties: `type` and `coordinates` . The `type` refers to seven shape types indicated by the following case-sensitive strings: `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`, and `GeometryCollection`. The `coordinates` property contains the coordinates of the geometry, these coordinates depend on the geometry type, but the lowest common denominator is the coordinate, which is an array of two *decimal degrees* numbers representing exactly in this order the *longitude* and the *latitude* of the *coordinate*.



> EXAMPLES
> 
> ------

[GeoJSON Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) is a [position](https://tools.ietf.org/html/rfc7946#section-3.1.1) comprised of a longitude and a latitude:

```json
{
	"type": "Point",
	"coordinates": [100.0, 0.0]
}
```

A [GeoJSON MultiPoint](https://tools.ietf.org/html/rfc7946#section-3.1.7) is an array of positions:

```json
{
	"type": "MultiPoint",
	"coordinates": [
		[100.0, 0.0],
		[101.0, 1.0]
	]
}
```

A [GeoJSON LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4) is an array of two or more positions:

```json
{
	"type": "LineString",
	"coordinates": [
		[100.0, 0.0],
		[101.0, 1.0]
	]
}
```

A [GeoJSON MultiLineString](https://tools.ietf.org/html/rfc7946#section-3.1.5) is an array of LineString coordinate arrays:

```json
{
	"type": "MultiLineString",
	"coordinates": [
		[
			[100.0, 0.0],
			[101.0, 1.0]
		],
		[
			[102.0, 2.0],
			[103.0, 3.0]
		]
	]
}
```

A [GeoJSON Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) consists of a series of closed `LineString` objects (ring-like). These *Linear Ring*objects consist of four or more vertices with the first and last coordinate pairs being equal. Coordinates of a Polygon are an array of linear ring coordinate arrays. The first element in the array represents the exterior ring. Any subsequent elements represent interior rings (holes within the surface).

A number of rules apply:

- A polygon must contain at least one linear ring, i.e., it must not be empty.
- A linear ring may not be empty, it needs at least three *distinct* coordinates, that is, at least 4 coordinate pairs (since the first and last must be the same).
- No two edges of linear rings in the polygon must intersect, in particular, no linear ring may be self-intersecting.
- Within the same linear ring consecutive coordinates may be the same, otherwise (except the first and last one) all coordinates need to be distinct.
- Linear rings of a polygon must not share edges, they may however share vertices.
- A linear ring defines two regions on the sphere. ArangoDB 3.9 and older will always interpret the region of smaller area to be the interior of the ring. This introduces a practical limitation that no polygon may have an outer ring enclosing more than half the Earth’s surface.
- The interior rings must be contained in the (interior) of the outer ring.
- Polygon rings should follow the right-hand rule for orientation (counterclockwise external rings, clockwise internal rings).

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

A [GeoJSON MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) consists of multiple polygons. The “coordinates” member is an array of *Polygon* coordinate arrays. See [above](https://www.arangodb.com/docs/stable/indexing-geo.html#polygon) for the rules and the meaning of polygons.

Additionally, the following rules apply:

- No two edges in the linear rings of the polygons of a MultiPolygon may intersect.
- Polygons in the same MultiPolygon may not share edges, they may share coordinates.

Example with two polygons, the second one with a hole:

```json
{
	"type": "MultiPolygon",
	"coordinates": [
		[
			[
				[102.0, 2.0],
				[103.0, 2.0],
				[103.0, 3.0],
				[102.0, 3.0],
				[102.0, 2.0]
			]
		],
		[
			[
				[100.0, 0.0],
				[101.0, 0.0],
				[101.0, 1.0],
				[100.0, 1.0],
				[100.0, 0.0]
			],
			[
				[100.2, 0.2],
				[100.2, 0.8],
				[100.8, 0.8],
				[100.8, 0.2],
				[100.2, 0.2]
			]
		]
	]
}
```