/**
 * init.js
 *
 * Initialise database and load ancillary data.
 */

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.
const { Database } = require("arangojs")	// ArangoDB driver.

//
// Connect to database.
//
const db = new Database({
	url: 'http://' + kPriv.user.db.host,	// Host.
	databaseName: kPriv.user.db.name,		// Database name.
	auth: {									// Authentication:
		username: kPriv.user.db.user,		// user code,
		password: kPriv.user.db.pass		// user password.
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
		console.log(db)

	} // TRY BLOCK

	catch(error)
	{
		//
		// Display error.
		//
		console.error(err.message)

	} // CATCH BLOCK

} // main()

main()
