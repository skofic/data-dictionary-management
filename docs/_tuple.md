### _tuple



------
#### Tuple



------
###### An array of independent types of values



------
A *tuple* is an *array* in which *each value* can take a *different type* depending on its *position*. Tuples belong to the top level data types such as [scalar](_scalar.md), [array](_array.md), etc.

The tuple requires  a [property](_tuple_types.md) consisting of an array of descriptor references. This descriptors list indicates the *data type* of *each element* of the tuple. The types can be of any shape and type.

The tuple can also feature a [structure](_elements.md) indicating the [minimum](_min-items.md) and [maximum](_max-items.md) *number of elements* in the tuple. The [_min_items.md]() must *at least* have *one element*, the [maximum number of elements](_max-items.md) must be *smaller or equal* to the *number of descriptors* in the [tuple types](_tuple_types.md). If you omit this [structure](_elements.md), the tuple must have as many elements as its types [property](_tuple_types.md).



------
```json
{
	"_tuple": {
		"_tuple_types": [
			"gcu_loc_longitude-d",
			"gcu_loc_latitude-d"
		]
	}
}
```

This example describes a *pair of coordinates* in which the first element is a [decimal longitude](gcu_loc_longitude-d.md) and the second element is a [decimal latitude](gcu_loc_latitude-d".md). The value must have exactly two elements, one for the longitude and the other for the latitude.

```json
{
	"_tuple": {
		"_elements": {
			"_min-items": 3,
			"_max-items": 4
		},
		"_tuple_types": [
			"gcu_loc_latitude",
			"gcu_loc_longitude",
			"gcu_loc_geodetic-datum",
			"gcu_loc_area"
		]
	}
}
```

This example describes a *tuple* made up of 4 values: the [DMS latitude](gcu_loc_latitude.md), the [DMS longitude](gcu_loc_longitude.md), the [geodetic datum](gcu_loc_geodetic-datum.md) of the coordinate and the total surface [area](gcu_loc_area.md) of the unit. The *coordinates* and the *datum* are *required*, while the *area* is *optional*.