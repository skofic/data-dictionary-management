# _type

Data type

Primitive data type of the descriptor values, the type of scalar data or the type of array or set elements.

The type should indicate whether the [descriptor](_term_descriptor) *data* represents a number, a string or another type. The type applies to *scalar data values* or to the *elements* of *lists* and *sets*.

These are the allowed values:

- [Boolean](_type_boolean): *True* or *false* value.
  
- [Integer](_type_integer): *Numeric discrete* value.
  
- [Numeric](_type_number): *Numeric discrete* or *continuous* value; will be considered a *floating point number*.
  
- [String](_type_string): A *character* or *text*; assumed to be encoded in UTF-8.
  
- [Record](_type_record): String, it is a record reference, expressed as the `_id` of a *database record*.
  
- [Time-stamp](_type_timestamp): A *time stamp* expressed in the *native database format*, used to indicate a precise moment in time.
  
- [Enumeration](_type_enum): String, it is a *controlled vocabulary* element. Use the [type reference](_kind) property to indicate which enumeration to use. If you provide in the [type reference](_kind) the wildcard term [any term](_any-term), the value can be the [global identifier](_gid) of *any term*.
  
- [Object](_type_object): An *object data structure*. Use the [type reference](_kind) property to indicate which [object data structure type](_term_object) to use. If you *omit* the [type reference](_kind) field, the value can be *any object*.