# _class

Data classification

The class of the descriptor's values, it indicates whether the value is categorical, quantitative or neither.

This property should indicate whether the [descriptor](_term_descriptor) *data* represents a [quantitative](_class_quantity) value, a [categorical](_class_category) value, or a value that is *neither*. The classification applies to *scalar data values* or to the *elements* of *lists* and *sets*. This classification is useful for determining what statistical testing can be applied to the data.

This is the set of data classes:

- [Categorical](_class_category): Examples of categorical values could be month, sex or country; essentially all items that could belong to a controlled vocabulary.
- [Quantitative](_class_quantity): Examples of quantitative data could be height, weight, age or area; essentially all items that represent an amount.
- [Other](_class_other): Examples of data that is neither categorical nor quantitative could be a name, a description or a telephone number; essentially all items that can take an infinite number of values and that do not represent an amount.