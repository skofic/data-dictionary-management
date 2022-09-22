### _gid

------

#### Global identifier

------

###### The unique identifier of the term within the data dictionary.

------

Terms are *uniquely identified* by this field, which is the concatenation of the [namespace](_nid) identifier and the [local identifier](_lid), separated by an underscore (`_`) *token*. The value is *computed* before *storing* the record in the *database*, so it is *read-only*.

This field is *required* and, once set, it *cannot* be *modified*, *including* the *properties* that are used to *constitute its value*.

------

`iso_3166_1_ITA` is the global identifier of the term that represents the ISO country code for *Italy*. `iso_3166_1` is the namespace, `ITA` is the local identifier.