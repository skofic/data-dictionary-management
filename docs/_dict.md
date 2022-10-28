### _dict



------
#### Dictionary data container



------
###### This property describes a key/value data dictionary, in which a string key is used to access a value.



------
This property defines the *shape* and *type* of a *key/value dictionary*. *Keys* are *strings* that *may* be *bound* to a *controlled vocabulary*, while *values* may be of *any type*. Once defined the *value type*, this must apply to *all values* in the *dictionary*.



------
```json
{
	"_dict_key": {
		"_class": "_class_category",
		"_type": "_type_string_enum",
		"_kind": "iso_639_3"
	},
	"_dict_value": {
		"_array": {
			"_class": "_class_other",
			"_type": "_type_object",
			"_kind": "some_object_definition",
			"_min-items": 5,
			"_max-items": 10
		}
	}
}
```

This example describes a *dictionary* whose *keys* are the *global identifiers* of the ISO 639 languages *controlled vocabulary elements*, and the values are *arrays* of *objects* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements.

```json
{
	"_dict_key": {
		"_class": "_class_other",
		"_type": "_type_string"
	},
	"_dict_value": {
		"_scalar": {
			"_class": "_class_other",
			"_type": "_type_string",
			"_format": "_format_markdown"
		}
	}
}
```

This example describes a *dictionary* whose *keys* are *plain strings* and *values* are *text* in *Markdown* format. It implements a multilingual styled text

```json
{
	"_dict_key": {
		"_class": "_class_category",
		"_type": "_type_string_enum",
		"_kind": "iso_3166_1"
	},
	"_dict_value": {
		"_dict": {
			"_dict_key": {
				"_class": "_class_category",
				"_type": "_type_string_enum",
				"_kind": "iso_639_3"
			},
			"_dict_value": {
				"_array": {
					"_class": "_class_other",
					"_type": "_type_object",
					"_kind": "some_object_definition",
					"_min-items": 5,
					"_max-items": 10
				}
			}
		}
	}
}
```

This example describes a *dictionary* whose *keys* are the *global identifiers* of the ISO 3166 country *controlled vocabulary elements*, and the values are *another dictionary* whose keys are ISO 639 languages and whose *values* are *arrays* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements. This is an example of a recursive dictionary definition.

```json
{
	"_dict_key": {},
	"_dict_value": {}
}
```

This example describes a dictionary whose *keys* can be *any string* and whose *values* can be *any container* with *any value*.