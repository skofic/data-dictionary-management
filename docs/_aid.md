### _aid



------
#### All identifiers



------
###### List of official identifiers.



------
This list should collect all *identifiers* that could be used to *reference the term*.

In the case of *variables*, these identifiers may be useful to *match the descriptor* when receiving external datasets.

In the case of *enumerations*, the list should include all *alternative codes* that correspond to the current [local identifier](_lid.md). In all cases, the [local identifier](_lid.md) must be *included* in this list.

Note that these identifiers should be *official* or *globally recognised* standards, such as alternative ISO codes. *Restricting* the list to *common standards* will make this property *more useful* and *accurate*.



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

In the above term `ITA` is the *official code* for Italy, but `IT` is an alternative code: all elements of the `_aid` list of codes can be used to select this term.