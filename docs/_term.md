### _term



------
TITLE

------

#### Term



------
DEFINITION

------

###### Term data structure.



------
DESCRIPTION

------

*Terms* are the *base class* upon which all elements of the data dictionary are created. This data definition includes the *minimum viable data structure* for instantiating *namespaces*, *types* and *enumerations*.

*Terms* require the [identification](_code) and [documentation](_info) sections, while the [data](_data) section should only be included by *descriptors*. Any additional property is allowed.



------
EXAMPLES

------

Generic term example:

```json
	{
		"_code": {
			"_nid": "namespace",
			"_lid": "local-identifier",
			"_gid": "namespace_local-identifier",
			"_aid": ["local-identifier"]
		},
		"_info": {
			"_title": {
				"iso_639_3_eng": "Title, name or label",
				"iso_639_3_ita": "Titolo, nome o etichetta"
			},
			"_definition": {
				"iso_639_3_eng": "Definition",
				"iso_639_3_ita": "Definizione"
			},
			"_description": {
				"iso_639_3_eng": "Full description.",
				"iso_639_3_ita": "Descrizione completa."
			},
			"_examples": {
				"iso_639_3_eng": "Usage examples.",
				"iso_639_3_ita": "Esempi di uso."
			}
		}
	}
```