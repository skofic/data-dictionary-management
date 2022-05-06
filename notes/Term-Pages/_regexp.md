# _regexp

Validation pattern

Regular expression for validating the value.

This field can be used to *validate* data by ensuring it follows a predefined *pattern*. This pattern is a *regular expression*, *regex*, according to the [ECMA 262](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) dialect. Note that, while validation patterns *apply* explicitly to *strings*, this field may also be used to match patterns in numeric data: numbers will be converted to string for pattern matching.

- `the.\\*fox`: Will match "*the quick brown fox*".
- `^[A-Z]{3}[0-9]{4}$`: Will match "*ITA1234*".
- `^[A-Z]{3}[0-9]{4}$`: Will not match "*ITA123*".
- `^[A-Z]{3}[0-9]{4}$`: Will not match "*ITA123456*".