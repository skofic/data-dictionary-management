/**
 * init.js
 *
 * Initialise database and load ancillary data.
 */

const { Database } = require("arangojs")			// ArangoDB driver.

const kGlob = require('./globals')				// Generic globals.
const kPriv = require('./user.globals')	// User-provided globals.

const dbutils = require('./database')		// Database utilities.
const process = require('./processing')	// Processing utilities.

//
// Connect to local database.
//
const db = new Database(
	{
		url: kPriv.user.db.host,			// Host.
		databaseName: kPriv.user.db.name	// Database name.
	}
)

//
// Connect to certified database.
//
// const db = new Database(
// 	{
// 		url: kPriv.user.db.host,			// Host.
// 		databaseName: kPriv.user.db.name,	// Database name.
// 		agentOptions: {						// Certificate.
// 			ca: Buffer.from(kPriv.user.db.encodedCA, "base64")
// 		}
// 	}
// )

//
// Authenticate.
//
db.useBasicAuth(kPriv.user.db.user, kPriv.user.db.pass);

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

		console.log("\n============================")
		console.log("Loading test data.")
		console.log("============================")
//		await process.ProcessTestData(db)

		console.log("\n============================")
		console.log("Validating dictionary.")
		console.log("============================")
		// result = await process.ValidateDocuments(db)
		result = await process.ValidateDescriptors(db)
		console.log(result)

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
