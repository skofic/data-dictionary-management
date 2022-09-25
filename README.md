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

The `data` directory contains a series of directories:

- `base`: Here are the JSON files for the core dictionary terms and edges, these files contain the definition for all core elements of the dictionary. The content is in JSON format, however, the files must be first processed by the `init.js` script and the result will be stored in the `processed` directory. This directory is divided into the following sub-directories:
    - `core`: The object definitions for all core components of the database.

    - `geo`: A set of descriptors and enumerations used for implementing ancillary geographic concepts.

    - `iso`: A set of descriptors and enumerations constituting the top level definitions of ISO standards.

    - `std`: A set of definitions used to define generic standards used in ancillary data.

    - `eufgis`: A set of descriptors and enumerations defining data standards for the [EUFGIS](http://www.eufgis.org) information system.

- *processed*: This directory contains the processed - *ready to be inserted into the database* - JSON files coming from the `base` directory, as well as the various ISO standards. Note that when you run the `init.js` script, besides generating the JSON files, the script will write the data to the database.

The database should be [ArangoDB](https://www.arangodb.com), check it out and install it if you want to try this out.

You should update the `user.globals.js` file according to your settings.

The data dictionary uses three collections:

* ***terms*** is a *document collection* that contains *descriptors*, *data types*, *enumerations* and all concepts pertaining to the data dictionary, 

* ***edges*** is an *edge collection* that connects the terms together to form *enumerations* and *structures*.

* ***topos*** is an *edge collection* that contains *experimental relationships*, someday it will morph into a feature.

The `init.js` script will load all those standards into the database, creating a clean slate data dictionary.

## The data dictionary

The dictionary is under development, there is not yet public documentation on *what it does*, *how to use it* and the business logic to make it useful, this will come in time and will be integrated into the [FORGENIUS](https://www.forgenius.eu) project.

Stay tuned...

Read the documentation [here](docs/README.md).