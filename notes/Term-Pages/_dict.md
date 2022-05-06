# _dict

Dictionary data container

This property describes a key/value data dictionary, in which a string key is used to access a value.

This property defines the *shape* and *type* of a *key/value dictionary*. *Keys* are *strings* that *may* be *bound* to a *controlled vocabulary*, while *values* may be of *any type*. Once defined the *value type*, this must apply to *all values* in the *dictionary*.

```json
{
    "_data_container_dict_key": {
        "_data_class": "_data_class_category",
        "_data_type": "_data_type_enum",
        "_data_kind": "iso_639_3"
    },
    "_data_container_dict_value": {
        "_data_container_array": {
            "_data_class": "_data_class_other",
            "_data_type": "_data_type_object",
            "_data_kind": "some_object_definition",
            "_data_min-items": 5,
            "_data_max-items": 10
        }
    }
}
```

This example describes a *dictionary* whose *keys* are the *global identifiers* of the ISO 639 languages *controlled vocabulary elements*, and the values are *arrays* of *objects* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements.

```json
{
    "_data_container_dict_key": {
        "_data_class": "_data_class_other",
        "_data_type": "_data_type_string"
    },
    "_data_container_dict_value": {
        "_data_container_scalar": {
            "_data_class": "_data_class_other",
            "_data_type": "_data_type_string",
            "_data_format": "_data_format_markdown"
        }
    }
}
```

This example describes a *dictionary* whose *keys* are *plain strings* and *values* are *text* in *Markdown* format. It implements a multilingual styled text

```json
{
    "_data_container_dict_key": {
        "_data_class": "_data_class_category",
        "_data_type": "_data_type_enum",
        "_data_kind": "iso_3166_1"
    },
    "_data_container_dict_value": {
        "_data_container_dict": {
            "_data_container_dict_key": {
                "_data_class": "_data_class_category",
                "_data_type": "_data_type_enum",
                "_data_kind": "iso_639_3"
            },
            "_data_container_dict_value": {
                "_data_container_array": {
                    "_data_class": "_data_class_other",
                    "_data_type": "_data_type_object",
                    "_data_kind": "some_object_definition",
                    "_data_min-items": 5,
                    "_data_max-items": 10
                }
            }
        }
    }
}
```

This example describes a *dictionary* whose *keys* are the *global identifiers* of the ISO 3166 country *controlled vocabulary elements*, and the values are *another dictionary* whose keys are ISO 639 languages and whose *values* are *arrays* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements. This is an example of a recursive dictionary definition.

```json
{
    "_data_container_dict_key": {},
    "_data_container_dict_value": {}
}
```

This example describes a dictionary whose *keys* can be *any string* and whose *values* can be *any container* with *any value*.