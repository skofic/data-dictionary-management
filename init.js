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
// Connect to local database.
//
const db = new Database({
	url: kPriv.user.db.host,			// Host.
	databaseName: kPriv.user.db.name,	// Database name.
	auth: {								// Authentication:
		username: kPriv.user.db.user,	// user code,
		password: kPriv.user.db.pass	// user password.
	}
})

//
// Connect to OASIS database.
//
// const encodedCA = "XXX";
// const db = new Database({
// 	url: kPriv.user.db.host,			// Host.
// 	databaseName: kPriv.user.db.name,	// Database name.
// 	agentOptions: {
// 		ca: Buffer.from(encodedCA, "base64")
// 	},
// 	auth: {								// Authentication:
// 		username: kPriv.user.db.user,	// user code,
// 		password: kPriv.user.db.pass	// user password.
// 	}
// })

// Note that ArangoDB Oasis runs deployments in a cluster configuration.
// To achieve the best possible availability, your client application has to handle
// connection failures by retrying operations if needed.
db.version().then(
	version => console.log(version),
	error => console.error(error)
);

/**
 * Main procedure.
 *
 * @returns {Promise<void>}
 */
async function main()
{
	try
	{
		let errors = 0
		let has_errors = false

		console.log("\============================")
		console.log("Initialising database.")
		console.log("============================")
		await dbutils.InitDatabase(db)

		console.log("\n============================")
		console.log("Processing dictionary files.")
		console.log("============================")
		await process.ProcessDictionaryFiles(db)

		console.log("\n============================")
		console.log("Loading ISO standards.")
		console.log("============================")
		await process.ProcessIsoStandards(db)
		return

		console.log("\n========x====================")
		console.log("Validating dictionary.")
		console.log("============================")
		errors = await process.ValidateTerms(db)
		if(errors > 0) {
			has_errors = true
			console.log(`!!! ${errors} errors!`)
		} else {
			console.log(`    no errors.`)
		}
		errors = await process.ValidateEdges(db)
		if(errors > 0) {
			has_errors = true
			console.log(`!!! ${errors} errors!`)
		} else {
			console.log(`    no errors.`)
		}
		errors = await process.ValidateTopos(db)
		if(errors > 0) {
			has_errors = true
			console.log(`!!! ${errors} errors!`)
		} else {
			console.log(`    no errors.`)
		}
		if(! has_errors) {
			await dbutils.DropErrorCollection(db, kPriv.user.db.error_col)
		}

	} // TRY BLOCK

	catch(error)
	{
		//
		// Display error.
		//
		// console.error(error.message)
		console.log(error)

	} // CATCH BLOCK

} // main()

main()
