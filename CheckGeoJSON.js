/**
 * CheckGeoJSON.js
 *
 * Iterate a GeoJSON file (converted to JSON)
 * and save one record at the time, keeping track
 * of all records that have errors.
 */

// Modern JavaScript
const { Database, aql } = require("arangojs")

const db = new Database(
	{
		url: "http://localhost:8529",	// Host.
		databaseName: "WorkDB",			// Database name.
		auth: {							// Authentication.
			username: "eufgis_developer",
			password: "letmein"
		}
	}
)


async function main()
{
// Using async/await
	try {
		const info = await db.createDatabase("WorkDB")
		// database created
	} catch (err) {
		console.error(err.stack)
	}
}

main()

// const db = new Database();
// (async function() {
// 	const now = Date.now();
// 	try {
// 		const cursor = await db.query(aql`
//       RETURN ${now}
//     `);
// 		const result = await cursor.next();
// 		// ...
// 	} catch (err) {
// 		console.log(err)
// 	}
// })();

// // or plain old Node-style
// var arangojs = require("arangojs");
// var db = new arangojs.Database();
// var now = Date.now();
// db.query({
// 	query: "RETURN @value",
// 	bindVars: { value: now }
// })
// 	.then(function(cursor) {
// 		return cursor.next().then(function(result) {
// 			// ...
// 		});
// 	})
// 	.catch(function(err) {
// 		console.log(err)
// 	});

// // Using different databases
// const db = new Database({
// 	url: "http://localhost:8529"
// });
// db.useDatabase("pancakes");
// db.useBasicAuth("root", "");
// // The database can be swapped at any time
// db.useDatabase("waffles");
// db.useBasicAuth("admin", "maplesyrup");
//
// // Using ArangoDB behind a reverse proxy
// const db = new Database({
// 	url: "http://myproxy.local:8000",
// 	isAbsolute: true // don't automatically append database path to URL
// });
//
// // Trigger ArangoDB 2.8 compatibility mode
// const db = new Database({
// 	arangoVersion: 20800
// });