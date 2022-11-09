/**
 * index.js
 *
 * Generic template
 */

const kGlob = require('./globals')				// Generic globals.
const kPriv = require('./user.globals')			// User-provided globals.
const { Database, aql } = require("arangojs")	// ArangoDB driver.
const kDb = require( "./db.globals" );			// Database globals.

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
		//
		// Init local storage.
		//
		let descriptors = {}

		//
		// Make query.
		//
		const cursor = await db.query(aql`
			FOR item IN characterisation
			RETURN item
		`)

		//
		// Execute query.
		//
		const records = await cursor.all()
		for(const doc of records) {

			//
			// Parse document.
			//
			for(const property of Object.keys(doc)) {
				switch(property) {
					case '_key':
						continue

					case '_id':
						continue

					case '_rev':
						continue

					default:
						if(!descriptors.hasOwnProperty(property)) {
							descriptors[property] = 0
						} else {
							descriptors[property] += 1
						}
				}
			}
		}

		for(const property of Object.keys(descriptors).sort()) {
			console.log(`${property}: ${descriptors[property]}`)
		}

	} // TRY BLOCK

	catch(error)
	{
		console.log(error)

	} // CATCH BLOCK

} // main()

main()
