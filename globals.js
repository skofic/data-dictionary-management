/**
 * Module globals.
 *
 * This file exports an object that holds the module globals.
 */

const globals = {

	"path": {
		"base": "./data/base/",
		"processed": "./data/processed/",
		"iso_json": "./external/iso-codes/data/",
		"iso_po": "./external/iso-codes/",
		"country": "./external/countries/dist/countries.json",
		"flags": "./external/country-flags/svg/"
	},

	"token": {
		"ns": "/",
		"tok": ":"
	},

	"dec": {
		"iso_639_1_to_3": {},
		"iso_639_2_codes": new Set(),
		"iso_639_3_codes": new Set(),
		"iso_639_5_codes": new Set()
	},

	"res": {
		"terms": {},
		"edges": [],
		"topos": []
	}
}

module.exports = { globals }
