### _nid



------
#### Namespace identifier



------
###### A reference to the term that represents the namespace of the current term, the value is the namespace term global identifier.



------
*Namespaces* are used to *group* terms under the same *category* or *classification*, the value of this property is the [global identifier](_gid.md) of the *term* that *represents* the *namespace* of the *current term*.

Namespaces are also used to *disambiguate* [local identifiers](_lid.md): *local identifiers* must be *unique* within the same *namespace*.

*Most* terms will have a namespace, but this property is *not required*: terms that do not have a namespace are usually used as top level namespaces.

Any term's [global identifier](_gid.md) can be used as a *namespace*.



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

This term, with [global identifier](_gid.md) `iso_3166_1_ITA`, represents the *ISO country code* for *Italy*, it has a [local identifier](_lid.md) `ITA` and a *namespace* `iso_3166_1`. This *namespace* is the concatenation of the following *namespaces*:

- `iso`: A term that represents the "*International Standards Organisation*" (ISO) *root namespace*.
- `3166`: A term, that has the `iso` term as its *namespace*, which represents the "*codes for the representation of names of countries and their subdivisions*".
- `1`: A term, that has the `iso_3166` term as its *namespace*, which represents "*Part 1: Country codes*".



```json
{
	"_lid": "iso",
	"_gid": "iso",
	"_aid": ["iso"]
}
```

This term has no *namespace*, it represents the *top level namespace*, `iso`, of the previous term.