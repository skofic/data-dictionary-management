### _type_string_date



------
#### Date



------
###### Year, year and month or year month and day.



------
This type can be used to indicate a *year*, a *year* and a *month*, or a full date with *year*, *month* and *day*.

The date is expressed as a [string](_type_string.md) field that can have a length of `4`, `6` or `8` digits in the following formats:

- `YYYY`: *Year*, this date indicates a specific year, but neither the month nor the day is known.
- `YYYYMM`: *Year* and *month*, this date indicates a year and month, the exact day is not known.
- `YYYYMMDD`: Full date: *year*, *month* and *day*. The exact day, month and year are known.

This data type is useful in cases where parts of the date are not known: rather than filling missing values with defaults (making the date effectively invalid), this way it is clear what are the known elements and which are not.

Note that the value can be used in sorting: dates with unknown elements will appear first.



------
`2007`: The date is sometime in 2007, the month or day are unknown.

`200703`: The date is sometime in march 2007, which day is unknown.

`20070312`: The date is 12th of March 2007.