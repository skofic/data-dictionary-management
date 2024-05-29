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
const collection_name = "french_gcu"


async function main()
{
// Using async/await
	try {
		// Check french_gcu
		const collections = await db.listCollections(true)
		if(collections.map( collection => collection.name).includes(collection_name)) {
			console.log("Collection found.")
			let error = false
			const cursor = await db.query(aql`FOR doc IN french_gcu RETURN doc`)
			for(const doc of await cursor.all()) {
				console.log(doc._key)
				let dummy
				switch(doc.geometry.type) {
					case "Polygon":
						console.log("Found Polygon")
						dummy = await db.query(aql`UPDATE ${doc._key} WITH { geometry_hash: MD5(TO_STRING(GEO_POLYGON(${doc.geometry.coordinates}))) } IN french_gcu`)
						break
					case "MultiPolygon":
						console.log("Found MultiPolygon")
						dummy = await db.query(aql`UPDATE ${doc._key} WITH { geometry_hash: MD5(TO_STRING(GEO_MULTIPOLYGON(${doc.geometry.coordinates}))) } IN french_gcu`)
						break
					default:
						console.log("Found other!!!")
						error = true
						break
				}

				console.log("\n")
				if(error) {
					break
				}
			}
		} else {
			console.log("Collection not found.")
		}

		// collections.forEach( collection => {
		// 	console.log(collection.name)
		// })

		// for (const collection of collections) {
		// 	if (collection.name === "french_gcu") {
		// 		const cursor = await db.query(aql`FOR doc IN ${collection.name} RETURN doc`)
		// 		const docs = await cursor.all()
		// 		for (const doc of docs) {
		// 			console.log(doc)
		// 		}
		// 	}
		// }

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