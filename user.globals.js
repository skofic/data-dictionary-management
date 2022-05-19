/**
 * User globals.
 */

const user = {

	"db": {
		"host": "192.168.188.2:8529",
		"name": "ddict",

		"user": "eufgis_developer",
		"pass": "letmein",

		"terms_col": "terms",
		"edges_col": "schemas",
		"topos_col": "topos",
		"error_col": "errors"
	},

	"flag": {
		"key_encode": "GID",
		"write_file": true
	}
}

module.exports = { user }
