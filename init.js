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
// const db = new Database({
// 	url: kPriv.user.db.host,			// Host.
// 	databaseName: kPriv.user.db.name,	// Database name.
// 	auth: {								// Authentication:
// 		username: kPriv.user.db.user,	// user code,
// 		password: kPriv.user.db.pass	// user password.
// 	}
// })

//
// Connect to OASIS database.
//
const encodedCA = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHRENDQWdDZ0F3SUJBZ0lRSkpyOVB1Zjh6d3VwMVBlUEQ5NHBGakFOQmdrcWhraUc5dzBCQVFzRkFEQW0KTVJFd0R3WURWUVFLRXdoQmNtRnVaMjlFUWpFUk1BOEdBMVVFQXhNSVFYSmhibWR2UkVJd0hoY05Nakl3TnpJeApNVFl3T0RJd1doY05NamN3TnpJd01UWXdPREl3V2pBbU1SRXdEd1lEVlFRS0V3aEJjbUZ1WjI5RVFqRVJNQThHCkExVUVBeE1JUVhKaGJtZHZSRUl3Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRE8KTEgwNTB1ckVuUCtVRURWdkVFUWtnUmZnRlFmMXVMYVA5dnBlQUI0T1BWSTllVzNlN2diUkxnWE9jVHdGYXluWQpCTm9KeTJzQlU4YndDR0Vrdy90YXVWZFhJTzhnSXNvSUpUdUpXMHBXaGIrTFVyeVNhVTJDSWpxY1QwSllzVHRRCkwzVjA5RnY5NHUzRWY4eFErQkdyQVFhWHVpWkhmTEtSb1llSTFsakV6STZadHNoS1k0aHFYYnFzZWNjQ0VhbkcKRnFvVHVjVjArcDkvc2hCOHo5UUZIL3hrSkgxOHVlVFFsby90bjNnSEtpdmU3d3JoRGJEY3BBMS9yS0VZQ3RMbwp3bFR2dlpCcG5LTVFjNGp5OE9kcCtnTDVLcG5iZFlNS2tYRk41b2UyUXVySHlCRkQ3bm5RKzRRTnYwS0lSVXZGCkVZT2pMZFVTeHFoK1lMbEZvLzQzQWdNQkFBR2pRakJBTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQQmdOVkhSTUIKQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJRMDNra3JtZ3hsNTdHT2VFd3BIdVFzb0hNYXJEQU5CZ2txaGtpRwo5dzBCQVFzRkFBT0NBUUVBcE40WVVXRjl5dWZOcEhRTitoQjhhWTg0bXRueVQ1VlY0MXUwNGpMZGxOL1dmaDFyCkVZUElJOFhNN0hESzJ2UkQvL1VIT1EvQ1UrS2dQeTJVVkJmUEF6Q24rWmVCcnRXY1BEclVuRUkydEo2WHFsQW8KbzNMY1k5bkpESmlocnE4dGlFOTZGMEpuc04waXB3U2N0UnNHYUVKU2ZVaDViVFkzZmlLNDF5SERGZkhSajkzQgo2b1lvRURMRlpzRkdwa1h6anpKYmNCU2NSSGdBamd4TUQ2N3JnbVp1TzVHb21BVzRJcmpiRXlMT0FvOFVzMUtmCk9SYzVMNStyUUxZdDNBbm1wWXo5OFdRR3hPeUlWMjNBenBnYmptSTFlWlNWTStCVHFkY3dlbVNBeE5QNys1dlQKdkhtZm01VWxDRTBEOVJIWngxbGxRcUdGVE41Rm9FTWFod3IyQ3c9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==";
const db = new Database({
	url: kPriv.user.db.host,			// Host.
	databaseName: kPriv.user.db.name,	// Database name.
	agentOptions: {
		ca: Buffer.from(encodedCA, "base64")
	},
	auth: {								// Authentication:
		username: kPriv.user.db.user,	// user code,
		password: kPriv.user.db.pass	// user password.
	}
})

// Note that ArangoDB Oasis runs deployments in a cluster configuration.
// To achieve the best possible availability, your client application has to handle
// connection failures by retrying operations if needed.
db.version().then(
	version => console.log(version),
	error => console.error(error)
);
// db.useBasicAuth("root", "mHskEhUcUlsGjOhEKwVX");

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

		console.log("\n============================")
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
