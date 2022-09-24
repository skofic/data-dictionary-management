### _lid



------
TITLE

------

#### Local identifier



------
DEFINITION

------

###### The unique identifier of the term, within its namespace.



------
DESCRIPTION

------

Terms are *uniquely identified* by their [global identifier](_gid.md), which is the concatenation of their [namespace](_nid.md) identifier and *local identifier*, this property, separated by an underscore (`_`) *token*.

The value of this field is an *identifier*, so it is recommended to exclude characters which are not allowed in *variable* or *field* names. The value must also *exclude* the underscore (`_`) *token*, which represents the separator between the [namespace](_nid.md) and this field.

This field is *required* and must be *unique* within its [namespace](_nid.md), once set, the value *cannot* be *changed*.



------
EXAMPLES

------

```json
{
	"_nid": "iso_3166_1",
	"_lid": "ITA",
	"_gid": "iso_3166_1_ITA",
	"_aid": ["ITA", "IT"],
	"_name": "Italia",
	"_regexp": "[A-Z]{3,3}"
}
```
`ITA` is the *local identifier* of this term, that *concatenated* with `iso_3166_1`, which is the [namespace](_nid.md), constitutes `ita_3166_1_ITA`, which is the [global identifier](_gid.md) of this term.



```json
{
	"_lid": "iso",
	"_gid": "iso",
	"_aid": ["iso"]
}
```
This snippet shows the code definition of the *ISO* namespace. As you can see,there is no [namespace](_nid.md) and the [global identifier](_gid.md) has the same value as the *local identifier*.