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
		"def": "./data/base/def",
		"std": "./data/base/std",
		"geo": "./data/base/geo",
		"env": "./data/base/env",
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
			"ALB", "ARM", "AUT", "AZE", "BLR", "BEL", "BIH", "BGR",
			"HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU",
			"GEO", "GRC", "HUN", "ISL", "IRL", "ISR", "ITA", "LVA",
			"LIE", "LTU", "LUX", "MLT", "MDA", "MNE", "NLD", "MKD",
			"NOR", "POL", "PRT", "ROU", "RUS", "SRB", "SVK", "SVN",
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
