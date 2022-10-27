/**
 * Module globals.
 *
 * This file exports an object that holds the module globals.
 *
 * Note skip_languages: the list of languages in which translations do not appear reliable.
 */

const globals = {

	"path": {
		"core": "./data/base/core",
		"std": "./data/base/std",
		"geo": "./data/base/geo",
		"iso": "./data/base/iso",
		"eufgis": "./data/base/eufgis",
		"characterisation": "./data/base/characterisation",

		"processed": "./data/processed/",

		"iso_json": "./external/iso-codes/data/",
		"iso_po": "./external/iso-codes/",

		"country": "./external/countries/dist/",

		"flags": "./external/country-flags/svg/"
	},

	"token": {
		"ns": "_",
		"tok": "/"
	},

	"dec": {
		"iso_639_1_to_3": {},
		"iso_639_2_codes" : new Set(),
		"iso_639_3_codes" : new Set(),
		"iso_639_5_codes" : new Set(),
		"iso_4217_codes"  : new Set(),
		"iso_3166_A2_to_A3": new Set()
	},

	"res": {
		"terms": {},
		"types": {},
		"edges": [],
		"topos": []
	},

	"eufgis": {
		"countries": new Set([
			"AUT", "BLR", "BEL", "BIH", "BGR", "HRV",
			"CZE", "DNK", "EST", "FIN", "FRA", "DEU",
			"GRC", "HUN", "ISL", "IRL", "ITA", "LVA",
			"LTU", "LUX", "MLT", "MDA", "NLD", "MKD",
			"NOR", "POL", "ROU", "SRB", "SVK", "SVN",
			"ESP", "SWE", "CHE", "TUR", "UKR", "GBR"
		])
	},

	"file_prefixes": {
		"term": [
			"namespace",
			"enumeration",
			"descriptor",
			"object"
		],
		"edge": [
			"schema",
			"struct"
		]
	},

	"skip_languages": [
		"xho", "zul", "ven", "mlt"
	]
}

module.exports = { globals }
