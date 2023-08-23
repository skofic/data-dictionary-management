### geometry_hash



------
#### Geometry hash



------
###### Unique identifier of a shape or geometry.



------
This descriptor should be the *unique reference* of a [geometry](geometry.md) in a *collection* containing only *distinct geometries*.

The value is obtained by *hashing* the [geometry](geometry.md) [GeoJSON](https://geojson.org) structure: the result is a *string* that *uniquely identifies* the *shape*. This string *will* then *become* the [unique ID](_key.md) of the *record containing the shape*.

Hashing the shape structure allows mixing different geometry types and guarantees that each shape will have a different identifier. Currently we use the [MD5](https://en.wikipedia.org/wiki/MD5) hash function on the string representation of the [geometry](geometry.md).