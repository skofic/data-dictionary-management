### _term_all



------
#### All types term



------
###### Term encompassing all variations



------
This data definition includes *all available term variations*. It features *all available sections* as *required descriptors* in the *rules section*.



------
Example:

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
		"_data": {
			"_class": "_class_quantity",
			"_scalar": {
				"_type": "_type_object",
				"_kind": "namespace_local-identifier"
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
			"_banned": ["b1", "b2", "b3"],
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

This ficticious term includes all the current available sections: the *code*, `[_code](_code.md)`, and *description*, `[_info](_info.md)`, sections *required by all terms*, the *data*, `[_data](_data.md)` section *required by descriptors* and the *rules*, `[_rule](_rule.md)` section *required by object data definitions*.