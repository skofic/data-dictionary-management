### _banned



------
#### Banned properties



------
###### List of banned properties.



------
This field contains a [descriptors selection rule](_selection-descriptors.md) that determines which *set* of *descriptors* must *not* be *included* in the [data structure definition](_type_object.md) of the *object*.

The selection *values* must be the [global identifier](_gid.md) of the *descriptors* that are *forbidden* from being *included* in the *object data structure*.

This rule should be evaluated at the *end* of the *validation workflow* and should *not trigger* an *error*: all banned properties should simply be *removed*.