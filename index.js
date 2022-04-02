/**
 * index.js
 *
 * Generic template
 */

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('user.globals')		// User-provided globals.
const { Database } = require("arangojs")	// ArangoDB driver.

//
// Connect to database.
//
const db = new Database({
	url: 'http://' + kPriv.user.db.host,
	databaseName: kPriv.user.db.name,
	auth: {
		username: kPriv.user.db.user,
		password: kPriv.user.db.pass
	}
})

/**
 * Main procedure.
 *
 * @returns {Promise<void>}
 */
async function main()
{
	try
	{

	} // TRY BLOCK

	catch(error)
	{

	} // CATCH BLOCK

} // main()

main()
