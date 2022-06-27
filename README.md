# Data Dictionary

This repository contains code to initialise and maintain the data dictionary.

## How to use

The sctipt `init.js` will:

- Drop the existing **terms**, **schemas** and **topos** collections.

- Create the above collections including indexes.

- Collect from the external repositories the ISO standards data and create the terms.

The `esternal` directory contains three submodules required by the scripts:

- [iso-codes](https://salsa.debian.org/iso-codes-team/iso-codes.git): This is a debian repository containing the **ISO 639**, **ISO 3166**, **ISO 4217** and **ISO 15924** standards, along with name translations in several languages.

- [countries](https://github.com/mledoze/countries.git): This repository collects additional information on countries, we use it here to add ancillary data.

- [country-flags](https://github.com/hjnilsson/country-flags.git): This repository contains SVG images for the country flags, that we add to our data.

The `data` directory contains two directories:

- *core*: Here are the JSON files for the core dictionary terms and edges.

- *processed*: This directory contains the processed - *ready to be inserted into the database* - JSON files. Note that when you run the `init.js` script, besides generating the JSON files, the script will write the data to the database.

The database should be [ArangoDB](https://www.arangodb.com), check it out and install it if you want to try this out.

You should update the `user.globals.js` file according to your settings.

The data dictionary uses three collections:

* ***terms*** is a *document collection* that contains *descriptors*, *data types*, *enumerations* and all concepts pertaining to the data dictionary, 

* ***schemas*** is an *edge collection* that connects the terms together to form *enumerations* and *structures*.

* ***topos*** is an *edge collection* that contains *experimental relationships*, someday it will morph into a feature.

Note that the above collection names are the root names, depending on the value of  *`db.mount`* in the `user.globals.js`, so if `db.mount` is "ddict" and `db.terms_col` is "terms", the actual collection name will be "ddict_terms".

The `init.js` script will load all those standards into the database, creating a clean slate data dictionary.

## The data dictionary

The dictionary is under development, there is not yet public documentation on *what it does*, *how to use it* and the business logic to make it useful, this will come in time and will be integrated into the [FORGENIUS](https://www.forgenius.eu) project.

Stay tuned...