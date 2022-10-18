/**
 * index.js
 *
 * Generic template
 */

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.
const { Database } = require("arangojs")	// ArangoDB driver.

//
// Connect to local database.
//
// const db = new Database(
// 	{
// 		url: kPriv.user.db.host,			// Host.
// 		databaseName: kPriv.user.db.name	// Database name.
// 	}
// )

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
// db.useBasicAuth(kPriv.user.db.user, kPriv.user.db.pass);

// Note that ArangoDB Oasis runs deployments in a cluster configuration.
// To achieve the best possible availability, your client application has to handle
// connection failures by retrying operations if needed.
// db.version().then(
// 	version => console.log(version),
// 	error => console.error(error)
// );

/**
 * Main procedure.
 *
 * @returns {Promise<void>}
 */
async function main()
{
	try
	{
		const value = {
			"_key": "_name",
			"_id": "terms/_name",
			"_rev": "_e8ntIBO--E",
			"_code": {
				"_nid": "",
				"_lid": "name",
				"_gid": "_name",
				"_aid": [
					"name"
				]
			},
			"_info": {
				"_title": {
					"iso_639_3_eng": "Local name"
				},
				"_definition": {
					"iso_639_3_eng": "Native or original name."
				},
				"_description": {
					"iso_639_3_eng": "This field should be included if there is a specific *denomination* or *name* that can be used to refer to the *instance* of the *term*. This is generally used to record the *name* in the *native language* without needing to reference the actual language."
				},
				"_examples": {
					"iso_639_3_eng": "粵語 / 粤语: The *original* name for the *cantonese language* in the *cantonese* language."
				}
			}
		}

		const string = JSON.stringify(value)

		console.log(JSON.parse(string))

	} // TRY BLOCK

	catch(error)
	{

	} // CATCH BLOCK

} // main()

main()
