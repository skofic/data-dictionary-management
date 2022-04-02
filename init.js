/**
 * init.js
 *
 * Initialise database and load ancillary data.
 */

const { Database } = require("arangojs")	// ArangoDB driver.

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.

const dbutils = require('./database')		// Database utilities.
const process = require('./processing')		// Processing utilities.

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
		console.log("\============================")
		console.log("Initialising database.")
		console.log("============================")
		await dbutils.InitDatabase(db)

		console.log("\n============================")
		console.log("Processing dictionary files.")
		console.log("============================")
		process.ProcessDictionaryFiles()

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
