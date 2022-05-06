# _dict_value

Dictionary value data definition

Data container and type definitions for dictionary values.

This [object](_container) defines the *type* of the *value* in a [dictionary](_container_dict), dictionary values can be of *any type*.

The *property* is *required*, but you can set it to an *empty object*: in that case it means that the dictionary can have *values* of *any type*.

```json
{
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

This example describes a *dictionary* whose *values* are *arrays* of *objects* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements.

```json
{
    "_dict_value": {
        "_scalar": {
            "_class": "_class_other",
            "_type": "_type_string",
            "_format": "_format_markdown"
        }
    }
}
```

This example describes a *dictionary* whose *values* are *text* in *Markdown* format.

```json
{
    "_dict_value": {
        "_dict": {
            "_dict_key": {
                "_class": "_class_category",
                "_type": "_type_enum",
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

This example describes a *dictionary* whose *values* are *another dictionary* whose keys are ISO 639 languages and whose *values* are *arrays* that correspond to the `some_object_definition` *data structure type*; these *array* values must have a *minimum* of `5` elements and a *maximum* of `10` elements. This is an example of a recursive dictionary definition.

```json
{
    "_dict_value": {}
}
```

This example describes a dictionary whose *values* can be *any container* with *any value*.