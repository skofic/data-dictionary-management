### _term_descriptor



> TITLE
> 
> ------

#### Descriptor



> DEFINITION
> 
> ------

###### Descriptor data structure.



> DESCRIPTION
> 
> ------

*Descriptors* are terms that define properties that carry values. They *inherit* all *properties* from *terms*, but add a section of [attributes](_data) that *describes* the *type* of *data* they define.



> EXAMPLES
> 
> ------

Descriptor example:

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
 			"_dict": {
				"_dict_key": {
					"_class": "_class_category",
					"_type": "_type_string_enum",
					"_kind": ["iso_639_3"]
				},
				"_dict_value": {
					"_scalar": {
						"_class": "_class_other",
						"_type": "_type_string",
						"_format": "_format_markdown"
					}
				}
			}
		}
	}
```