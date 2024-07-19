### _array_prefix



------
#### Array prefix



------
###### Prefix used when distributin the array elements into their individual columns



------
This field is used when exploding the values of an array in a table. Rather than displaying a list of comma delimited values in a single column, the values will all have their own column with a header containing the string set in this variable followed by the index number of the array element (base 1).

This also means that the table needs to accomodate header rows that can merge cells together, since we need two header rows: one for the scalar indicators and one for the elements of the array values.

This field should be used at the top level `_array` or `_set` instance in the data section. The data section must either be an array or set which contains scalar elements. Nested arrays will not be considered.

This value is only considered when generating table data, it has no other function.



------
```json
{
	"_code": {
		"_gid": "chr_AdmIndexMain",
		...
	},
	"_info": {
		...
	},
	"_data": {
		"_array": {
			"_array_prefix": "Q",
			"_scalar": {
				"_type": "_type_number",
				"_decimals": 4,
				"_valid-range": {
					"_min-range-inclusive": 0.0,
					"_max-range-inclusive": 1.0
				}
			}
		}
	}
}

```

Above is the partial *definition* of the "Admixture index" indicator in the data dictionary. In the [data section](_data.md) you see that this variable is defined as an [array](_array.md), below this array section you see that the array prefix is set to the letter "Q".

```json
{
	"gcu_id_number": "ALB00001",
	"species": "Abies alba",
	"chr_AdmIndexMain": [ 0.8554, 0.1000, 0.0446 ],
	...
},
  ...
```

Above is an *example* of a *data record*: we have GCU and species, that are required by the indicator, and the value of admixture index which is an array of three elements.

|                   |             | *Admixture* | *index* | *main* |
| ----------------- | ----------- | ----------- | ------- | ------ |
| **gcu_id_number** | **species** | **Q1**      | **Q3**  | **Q2** |
| ALB00001          | Abies alba  | 0.8554      | 0.0446  | 0.1000 |

Above is a table example of the resulting data. You will see that the first two columns are scalar columns, while the three last columns all belong to the admixture index indicator. Setting array prefix to "Q" will split the elements of the array into three separate columns which all belong to the admixture indicator and feature a header prefixed with the "Q" character.

As you may have realised, looking at this example, you will need two header rows with the first row grouping together the last three columns, a thing that I don't know how to do in pure Markdown...