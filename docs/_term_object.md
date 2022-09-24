### _term_object



------
TITLE

------

#### Object



------
DEFINITION

------

###### Object data structure definition.



------
DESCRIPTION

------

This data definition includes the *minimum viable data structure* for instantiating *object type definitions*.

*Objects* require the *identification*, *documentation* and *rules* sections, while the *data* section is only required by *descriptors*.



------
EXAMPLES

------

Object structure refinition example:

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
		},
		"_rule": {
			 "_required": {
				"_selection-descriptors_all": ["d1", "d2"]
			},
			"_recommended": {
				"_selection-descriptors_one": ["d3", "d4"],
				"_selection-descriptors_any": ["d4", "d5"]
			},
			"_banned": ["b1", "b2", "b3"]
			"_computed": ["d1"],
			"_locked": ["d6"],
			"_immutable": ["d2", "d3"],
			"_default-value": {
				"my_number": 12,
				"my_label": "default label",
				"my_list": [1, 2, 3]
			}
		}
	}
```