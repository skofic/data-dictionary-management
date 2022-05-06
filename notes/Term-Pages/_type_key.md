# _type_key

Key data type

Data type for dictionary keys.

This field defines the [data type](_dict_key) of a *dictionary key*. Data is expected to have a [string](_type_string) base value, or it can be a [controlled vocabulary](_type_enum).

These are the allowed values:

- [String](_type_string): A *character* or *text*; assumed to be encoded in UTF-8.
- [Enumeration](_type_enum): String, it is a *controlled vocabulary* element. Use the [type reference](_kind) property to indicate which enumeration to use.