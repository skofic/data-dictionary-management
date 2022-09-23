### _banned



> TITLE
> 
> ------

#### Banned properties



> DEFINITION
> 
> ------

###### List of banned properties.



> DESCRIPTION
> 
> ------

This field contains a set of *descriptors* that should *not* be *included* in the *data structure definition* of the *object.

The *data type* of the set *values* must be the *global identifier* of the *descriptors*.

In order for the *object data structure* to be *valid*, its *properties* *must not include* the *elements* of this *set*.

This rule should be evaluated at the *end* of the *validation workflow* and should *not trigger* an *error*: all banned properties should simply be *removed*.