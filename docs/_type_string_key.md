### _type_string_key



------
#### Key reference



------
###### Reference to a document key.



------
It is a [string](_type_string) representing the [global identifier](_gid) of a *document* from *any collection*. It is possible to associate a [data kind](_kind.md), to this data type, in order to filter specific kinds of terms:

- [Any term](_any-term.md): The string must *reference* a *document* of the *terms collection*.
- [Any enumeration](_any-enum.md): The string must *reference* a *document* of the *terms collection*, and the referenced term must be an [enumeration](_type_string_enum.md) element.
- [Any descriptor](_any-descriptor): The string must *reference* a *document* of the *terms collection*, and the referenced term must feature a [data section](_data.md).
- [Any object:](_any-object.md) The string must *reference* a *document* of the *terms collection*, and the referenced term must feature a [rule section](_rule.md).



------
```json
{
	"_scalar": {
		"_type": "_type_string_key"
	}
}
```

The string can be the [key](_key.md) of *any* document in the *database*.



```json
{
	"_scalar": {
		"_type": "_type_string_key",
    "_kind": "_any-term"
	}
}
```

The string can be the [key](_key.md) of *any* document in the *terms collection*.



```json
{
	"_scalar": {
		"_type": "_type_string_key",
		"_kind": "_any-enum"
	}
}
```

The string can be the [key](_key.md) of *any* document in the *terms collection* that represents an [enumeration element](_type_string_enum.md).



```json
{
	"_scalar": {
		"_type": "_type_string_key",
		"_kind": "_any-descriptor"
	}
}
```

The string can be the [key](_key.md) of *any* document in the *terms collection* that represents a [descriptor](_term_descriptor.md). A descriptor is a [term](_term.md) that has a [data section](_data.md), it contains the metadata for a data variable.



```json
{
	"_scalar": {
		"_type": "_type_string_key",
		"_kind": "_any-object"
	}
}
```

The string can be the [key](_key.md) of *any* document in the *terms collection* that represents an [object definition](_term_object.md). A [term](_term.md) that represents an object definition has a [rule section that indicates which properties the object can or cannot have.