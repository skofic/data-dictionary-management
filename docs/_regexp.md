### _regexp



> TITLE
> 
> ------

#### Validation pattern



> DEFINITION
> 
> ------

###### Regular expression for validating the value.



> DESCRIPTION
> 
> ------

This field can be used to *validate* [string](_string.md) data by ensuring it follows a predefined *pattern*. This pattern is a *regular expression*, *regex*, according to the [ECMA 262](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) dialect.

This property normally belongs to the [data section](_data.md), however, besides being used in [descriptors](_term_descriptor.md) it can also be used in [controlled vocabulary](_type_string_enum.md) types to indicate the pattern of the enumeration codes. In that case it can be added to the [identification section](_code.md).

If this property is used in a [descriptor](_term_descriiptor.md) that also serves as [enumeration](_type_string_enum.md) type, it will refer to the pattern applied to the [local identifier](_lid.md), or enumeration code.



> EXAMPLES
> 
> ------

- `the.\*fox`: Will *match* "*the quick brown fox*".
- `^[A-Z]{3}[0-9]{4}$`: Will *match* "*ITA1234*".
- `^[A-Z]{3}[0-9]{4}$`: Will *not match* "*ITA123*".
- `^[A-Z]{3}[0-9]{4}$`: Will *not match* "*ITA123456*".