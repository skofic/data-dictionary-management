### _gid



> TITLE
> 
> ------

#### Global identifier



> DEFINITION
> 
> ------

###### The unique identifier of the term.



> DESCRIPTION
> 
> ------

Terms are *uniquely identified* by the *global identifier*, which is the concatenation of the [namespace](_nid.md) identifier and the [local identifier](_lid.md), separated by an underscore (`_`) *token*. The value is *computed* before *storing* the record in the *database*, so it is *read-only*.

This value is also *copied* to the [document key](_key.md), becoming the *unique identifier* of the *document* within its *collection*.



> EXAMPLES
> 
> ------

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

`iso_3166_1_ITA` is the *global identifier* of the above term, it is constituted by the *concatenation* of `iso_3166_1` [namespace](_nid.md) and the `ITA` [local identifier](_lid.md), separated bi an underscore (`_`) token.



```json
{
	"_lid": "iso",
	"_gid": "iso",
	"_aid": ["iso"]
}
```

This snippet shows the code definition of the *ISO* top level namespace, the term has no [namespace](_nid.md), the [local](_lid.md) and *global* identifiers share the same value, `iso`.