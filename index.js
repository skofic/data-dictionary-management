/**
 * index.js
 *
 * Generic template
 */

const { Database } = require("arangojs")	// ArangoDB driver.
const kPriv = require('./user.globals')		// User-provided globals.

//
// Connect to database.
//
const db = new Database({
	url: kPriv.user.db.host,			// Host.
	databaseName: kPriv.user.db.name,	// Database name.
	auth: {								// Authentication:
		username: kPriv.user.db.user,	// user code,
		password: kPriv.user.db.pass	// user password.
	}
})

/**
 * Main procedure.
 *
 * @returns {Promise<void>}
 */
async function main()
{
	//
	// Test map callback with more than one argument.
	//
	function callback(item) {
		return item + 10
	}

	let array = [1, 2, 3]
	let result = array.map(callback)

	console.log(result)

} // main()

main()
