### _format



> TITLE
> 
> ------

#### Data format



> DEFINITION
> 
> ------

###### Format or encoding of the data.



> DESCRIPTION
> 
> ------

This field can be used to indicate that the *value* is *formatted* or *encoded*. The idea is to implement backend functions for validating or processing data provided in the format and handle appropriately the format when returning the data to the user, such as displaying styled text when handling *markdown* or *html*.

In general, the *data type* will be *string*.



> EXAMPLES
> 
> ------

This field can be used to indicate in which standard the *value* is *formatted* or *encoded*. The idea is to implement backend functions for validating or processing data provided in the format and handle appropriately the format when returning the data to the user, such as displaying styled text when handling *markdown* or *html*.

The [data type](_type.md) of the value will be [string](_type_string.md), these are the currently codified formats:

- [Markdown](_format_markdown.md) [formatted](https://en.wikipedia.org/wiki/Markdown) string.
- [HTML](_format_html.md) [HyperText](https://en.wikipedia.org/wiki/HTML) markdown formatted string.
- [URI](_format_uri.md), [Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier).
- [HEX](_format_hex,md): This option indicates that the string should be treated as a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) value.
- [SVG](_format_svg.md), [Scalable Vector Graphics (SVG)]([Scalable Vector Graphics - Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)) image as string.
- [E-mail](_format_email.md), an [electronic mail]([Email - Wikipedia](https://en.wikipedia.org/wiki/Email)) address.
- [YMD](_format_ymd.md), a string representing a date in `YYYYMMDD` format, where day, or day and month may be omitted.
- [Date](_format_date.md), a date expressed in [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
- [Time](_format_time.md), a time expressed in [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
- [Date-time](_format_date-time.md), a date and time expressed in [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
- [Hostname](_format_hostname.md), an Internet host name, see [RFC5890, section 2.3.2.3](https://datatracker.ietf.org/doc/html/rfc1123#section-2.1).
- [IPV4](_format_ipv4.md), an IPv4 Internet address as defined in [RFC 2673, section 3.2](https://tools.ietf.org/html/rfc2673#section-3.2).
- [IPV6](_format_ipv6.md), an IPv6 Internet address as defined in [RFC 2373, section 2.2](http://tools.ietf.org/html/rfc2373#section-2.2).