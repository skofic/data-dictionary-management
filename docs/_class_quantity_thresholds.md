### _class_quantity_thresholds



------
#### Thresholds



------
###### Quantitative value thresholds



------
This field can be used to determine how a quantitative value should be divided into a set of ranges. It is an array of objects indicating the minimum and maximum threshold values and the corresponding optional label. This variable is used in data dictionary descriptors as a display indicator.

If the array is empty it means that the threshold is automatic. If this variable is missing from the descriptor, it either means that the target value is not quantitative or the target value is to be displayed as-is.



------
```json
{
	...
	"_data": {
		"_class_quantity_thresholds": [
      {
        "_min-range-inclusive": 10,
        "_title": {"iso_639_3_eng": ">=10 Lower threshold"}
      },
      {
        "_min-range-exclusive": 10,
        "_max-range-inclusive": 100,
        "_title": {"iso_639_3_eng": ">10 <=100 Medium threshold"}
      },
      {
        "_min-range-inclusive": 101,
        "_title": {"iso_639_3_eng": "<101 Upper threshold"}
      }
    ],
    ...
	}
}

```

Above is an example of a quantitative threshold definition. The variable belongs in the data section of the descriptor for a quantitative value. In the above example we have three thresholds:

- A value range up to 1 inclusive with its english label.
- A value greater than 10 up to 100 inclusive with its english label.
- A value range from 101 inclusive to infinity with its english label.

The array can be empty, in which case it means that the thresholds are *automatic*.

If the field is missing from the data section of the descriptor, it means that the value is to be displayed as is.

*Note that this field should be ignored if the corre3sponding descriptor value is not quantitative.*