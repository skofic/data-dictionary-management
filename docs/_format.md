### _format

------

#### Data format

------

###### Format or encoding of the data.

------

This field can be used to indicate that the *value* is *formatted* or *encoded*. The idea is to implement backend functions for validating or processing data provided in the format and handle appropriately the format when returning the data to the user, such as displaying styled text when handling *markdown* or *html*.

In general, the *data type* will be *string*.

------

The field is a controlled vocabulary, these are the allowed values:

- [`markdown`](/enum/data/formats/markdown): [Markdown](https://en.wikipedia.org/wiki/Markdown) formatted string.
- [`html`](/enum/data/formats/html): [HyperText](https://en.wikipedia.org/wiki/HTML) markdown formatted string.
- [`uri`](/enum/data/formats/uri): [Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier).
- [`hex`](/enum/data/formats/hex): This option indicates that the string should be treated as a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) value.
- `svg`: [Scalable Vector Graphics (SVG)]([Scalable Vector Graphics - Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)) image as string.
- `email`: An [electronic mail]([Email - Wikipedia](https://en.wikipedia.org/wiki/Email)) address.
- `ymd`: A string representing a date in `YYYYMMDD` format, where day, or day and month may be omitted.
- `date`: A date expressed in [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
- `time`: A time expressed in [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
- `date-time`: A date and time expressed in [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
- `hostname`: An Internet host name, see [RFC5890, section 2.3.2.3](https://datatracker.ietf.org/doc/html/rfc1123#section-2.1).
- `ipv4`: An IPv4 Internet address as defined in [RFC 2673, section 3.2](https://tools.ietf.org/html/rfc2673#section-3.2).
- `ipv6`: An IPv6 Internet address as defined in [RFC 2373, section 2.2](http://tools.ietf.org/html/rfc2373#section-2.2).