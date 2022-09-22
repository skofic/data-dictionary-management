### _regexp

------

#### Validation pattern

------

###### Regular expression for validating the value.

------

This field can be used to *validate* data by ensuring it follows a predefined *pattern*. This pattern is a *regular expression*, *regex*, according to the [ECMA 262](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) dialect. Note that, while validation patterns *apply* explicitly to *strings*, this field may also be used to match patterns in numeric data: numbers will be converted to string for pattern matching.

This property normally belongs to the [data section](_data), however, besides being used in [descriptors](_term_descriptor) it can also be used in controlled vocabulary types to indicate the pattern of the enumeration codes. In that case it can be added to the [identification section](_code). If this property is used in a [descriptor](_term_descriiptor) that also serves as enumeration type, it will refer to the pattern applied to the [local identifier](_lid), or enumeration code.

------

- `the.\*fox`: Will match "*the quick brown fox*".
- `^[A-Z]{3}[0-9]{4}$`: Will match "*ITA1234*".
- `^[A-Z]{3}[0-9]{4}$`: Will not match "*ITA123*".
- `^[A-Z]{3}[0-9]{4}$`: Will not match "*ITA123456*".