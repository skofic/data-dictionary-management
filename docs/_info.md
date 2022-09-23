### _info



> TITLE
> 
> ------

#### Documentation section



> DEFINITION
> 
> ------

###### This object groups all properties whose function is to document, explain and comment on terms.



> DESCRIPTION
> 
> ------

This property should represent the *name*, *title* or *label* that represents the term. This *text* will be used as a *label* in *input forms*, or as table *headers* in which data will be displayed.

The contents are a *key/value dictionary* in which the *key* represents the *language* in which the title is expressed, and the *value* is the *title* in *plain text*.

This property is *required* by all term types, there is only *one* instance in which it can be *omitted*: if the term is a *controlled vocabulary element* and there is a [bridge](_predicate_bridge-of) relationship to a preferred term, this section can be omitted, since it would contain the same content as the referenced term. This case occurs when the same enumeration has different codes and you want to enforce a specific code version as default.



> EXAMPLES
> 
> ------

```json
{
	"_info": {
		"_title": "Elevation",
		"_definition": "Elevation records a location altitude starting from sea level."
		"_description": "This *measuremenr* is important to correctly assess climatic variables.",
		"_examples": "`0`: Sea level.
`1500`: Elevation at 1500m.
`-20`: Negative elevations are allowed."
		"_notes": "The value *must* be expressed in meters."
	}
}
```