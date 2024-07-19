### _code



------
#### Identification section



------
###### This object groups all properties whose function is to identify terms in the data dictionary.



------
All terms *require* this object property which features the following identifiers:

- [Namespace](_nid.md): The namespace is the [global identifier](_gid.md) of a *term* that is used to *disambiguate* [local identifiers](_lid.md). This can be used to allow several terms to share the same [code](_lid.md). This property is *optional*.
- [Local identifier](_lid.md): A *code* that *uniquely identifies* the *term* within its [namespace](_nid.md). This property is *required*.
- [Global identifier](_gid.md): The *concatenation* of [namespace](_nid.md) and [local](_lid.md) identifiers, joined by a *separator token*, this *constitutes* the *unique identifier* of the *term*. This property is *required* and its value will be copied to the [document key](_key.md).
- [Identifier codes](_aid.md): List of all relevant *identifier codes* related to the term *including* the [local identifier](_lid.md).
- [Provider identifiers](_pid.md): List of *identifier codes* assigned to the *term* by *data providers*.
- [Name](_name.md): *Local*, *native* or *original name* assigned to the term. This property is *optional* and should be *only* used if such information is *relevant*.
- [Regular expression](_regexp.md): This property can be used to *apply* a *validation pattern* to the [local identifier](_lid.md), it is an *optional* property.

This object section groups all the relevant information needed to *identify* *terms* using *codes*.



------
```json
{
	"_code": {
		"_nid": "iso_3166_1",
		"_lid": "ITA",
		"_gid": "iso_3166_1_ITA",
		"_aid": ["ITA", "IT"],
		"_name": "Italia",
    "_regexp": "[A-Z]{3,3}"
	}
}
```
This snippet holds the following information:

- [Namespace](_nid.md): `iso_3166_1` represents the [ISO](https://www.iso.org/home.html) [countries](https://www.iso.org/iso-3166-country-codes.html) standard, this means that all the [local identifiers](_lid.md) of terms which feature this namespace are assumed to *belong* to [that](https://en.wikipedia.org/wiki/ISO_3166-1) standard and must be *unique* *within* that *namespace*.
- [Local identifier](_lid.md): `ITA` is the term *local identifier* or *code*. Within the `iso_3166_1` [namespace](_nid.md), only *this* term can have this local identifier *code*.
- [Global identifier](_gid.md): `iso_3166_1_ITA` is the *combination* of the [namespace](_nid.md), `iso_3166_1`, and the [local identifier](_lid.md), `ITA`, *joined* by the *underscore*, `_`, token. This represents the *unique identifier* of the *term*, meaning that there can *only be one term* featuring this [unique identifier](_gid.md). Note that this value will be copied in the document [key](_key.md).
- [All identifiers](_aid.md): this *set* of *codes* collects all *identifiers* that *can be used* to *refer to* the *current term*. This is a *list* of *acronyms* that can safely be *associated* with the *term*. The [local identifier](_lid.md) *must* also be *included*. This means that `Italy` can be identified both with the *2-character* code `IT`, or with the *3-character* code `ITA`, which is the [local identifier](_lid.md) of the term.
- [Name](_name.md): In *this case* it *makes sense* to include the *original name* of the term, which, is `Italia`, *Italy* in *Italian*. *This information should only be included if relevant*.
- [Regular expression](_regexp.md): This represents a *pattern* to which the [local identifier](_lid.md) *must conform*. There is already a *regular expression* that *restricts all local identifiers*, the current [field](_regexp.md) can be used to *further restrict* the *pattern*. In this case the code must be composed of *three uppercase letters*.


```json
{
	"_code": {
		"_lid": "iso",
		"_gid": "iso",
		"_aid": ["iso"]
	}
}
```
This snippet shows the code definition of the *ISO* namespace. As you can see,there is no [namespace](_nid.md) and the [global identifier](_gid.md) has the same value as the [local identifier](_lid.md). The list of [alternative codes](_aid.md) only includes the required *local identifier*.