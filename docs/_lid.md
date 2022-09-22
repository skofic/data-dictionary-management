### _lid

------

#### Local identifier

------

###### The unique identifier of the term, within its namespace.

------

Terms are *uniquely identified* by their [global identifier](_gid), which is the concatenation of the [namespace](_nid) identifier and the *this property*, separated by an underscore (`_`) *token*. The value of this field is a string that should *not include* characters that are *not allowed* in *variables* or *database fields*.

This field is *required* and must be *unique* within its *namespace*, once set, the value *cannot* be *changed*.

------

`iso_3166_1_ITA` is the global identifier of the term that represents the ISO country code for *Italy*. `iso_3166_1` is the namespace, `ITA` is the local identifier.