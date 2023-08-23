### geometry_bounds



------
#### Geometry bounds



------
###### A GeoJSON geometry enclosing a shape.



------
This descriptor can be used to provide a frame around another shape, it will generally be a polygon that delimits one or more shapes including an optional buffer. These shapes will typically be the [geometry](geometry.md) property of the current object. The value must be a [GeoJSON](https://geojson.org) `geometry` structure.

One usage is when dealing with raster data of fixed resolution: the geometry could be a point and the geometry bounds could be the bounding box around the point representing the resolution.