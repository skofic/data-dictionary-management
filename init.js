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
const encodedCA = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHVENDQWdHZ0F3SUJBZ0lSQU1sV0hOdStoU1J2b2RkeWdJSHFuOUV3RFFZSktvWklodmNOQVFFTEJRQXcKSmpFUk1BOEdBMVVFQ2hNSVFYSmhibWR2UkVJeEVUQVBCZ05WQkFNVENFRnlZVzVuYjBSQ01CNFhEVEl5TURreQpPVEE0TlRReU5sb1hEVEkzTURreU9EQTROVFF5Tmxvd0pqRVJNQThHQTFVRUNoTUlRWEpoYm1kdlJFSXhFVEFQCkJnTlZCQU1UQ0VGeVlXNW5iMFJDTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUEKMEpiQXZWS05TcjdqZzQ1eWlKKzdPTDB6VjRkTXZ0akJWZkJCdkJPWWxKaTlkMkpKTWg4SWFnVXVocVhXcVdVOAowcmJ1YlNhQ0REbzlWZHZwa1lBeWtwTlNoT0tzbkF2VXR1VkN0V25wNEg3WFZicDc1YzlOUi9jZG1OOUQ4WEpRCnlaRGlsN1VCSzBEeHVjQWg3Q1lPaUJwaDZ3RTZ5T1U3ZTdBclZIc0lXOW5HWmt3UXVUU3podHdzS2VPZ2xyQzQKRkxhOGZocVBaSXpESWJzaGh0ejd1a1dSWDR1bGtxUHlKQnlIY21aVmMwajc1N1JSQTJIcFJBR2tZd2pRVUw0NgpRZVRScFNRTGNaK2tqUlU3LzRaNU00Z3lvdjBraGpad3lMb0lDMjlNcHV4WGZVdGxqSVh3dnFSOHR4L3QvV2lBCktiTElha1RWbHNRMHhBcUtJUnNwa3dJREFRQUJvMEl3UURBT0JnTlZIUThCQWY4RUJBTUNBcVF3RHdZRFZSMFQKQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVUJyRS9VQnAvTHFHZFVQK25kN1ZkWjZ4Tis1a3dEUVlKS29aSQpodmNOQVFFTEJRQURnZ0VCQU1QN2pBdUp3dzNVa0JnK05mY0xMV2d5a2NnTHREOHkyaStzVkw3d2dIVzdqcXl2Cm1XVkEzcVRtbWd2eEszZ3kyQ2tnTGtGc0plYjlzR2RyUjhlVVgvTFg4WVBYUDhZMFM4UkZEN00yTGlpT3VZMmIKcnFOSFE1cDhoSTBBQzdNRW9xdmpwZGZNcGR2MW5LeGlubmJBNy9RVE43bVVtSlVtc1Fyc2xpRkR6emJjMWYzWAp1RTlXeUpaTTUxcUhTRVpZeUdKNnhyQ09RWkh3K2RWbk9FcERDbFRvOFR3VXFCRVBIelEvOE5yTVBoV3ZYMXpIClBTalZzK2lNODgxMTdvZGt1RkdqN1R6cmo0bFNnZU53eEE1dzVTY29sU3RIV0tzaTMzSFBja3czNTNGdnovTm8KMHJ3eVdXSzVRVnA3QlpEQUw3c0FnSVhYUWY5Rk1ac2o2dElUTXE4PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==";
const db = new Database({
	url: "https://a525261164c6.arangodb.cloud:18529",
	databaseName: kPriv.user.db.name,
	agentOptions: {
		ca: Buffer.from(encodedCA, "base64")
	}
})
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
