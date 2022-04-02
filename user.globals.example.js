/**
 * User globals.
 *
 * This file exports an object that holds user globals,
 * duplicate the file and rename it to "user.globals.js",
 * then replace the values with your data.
 */

const user = {
	
	"db": {
		"host": "<database host:port>",
		"name": "<database name>",
		"user": "<database user name>",
		"pass": "<database user password>",
		"terms_col": "<terms collection name>",
		"edges_col": "<schema edges collection name>",
		"topoe_col": "<topographic edges collection name>"
	},

	"flag": {
		"key_encode": "<Encode global identifiers: MD5|COL>"
	}
}

module.exports = { user }
