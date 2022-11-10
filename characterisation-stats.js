/**
 * index.js
 *
 * Generic template
 */

const fs = require('fs')						// Filesystem.
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
		// Handle data points.
		//
		await WriteDataPoints('./export/data-points.txt')

		//
		// Handle species.
		//
		await WriteSpecies('./export/species.txt')

		//
		// Handle countries.
		//
		await WriteCountries('./export/countries.txt')

	} // TRY BLOCK

	catch(error)
	{
		console.log(error)

	} // CATCH BLOCK

} // main()

/**
 * Write data points
 * This function will write a tab-delimited file containing all descriptors
 * by number of data points.
 * @param theFileName {String}: File path.
 * @return {Promise<void>}
 */
async function WriteDataPoints(theFileName)
{
	//
	// Init local storage.
	//
	let descriptors = {}

	//
	// Collect descriptor names.
	//
	let cursor = await db.query(aql`
			FOR item IN ${db.collection(kDb.collection_char)}
			RETURN item
		`)
	let records = await cursor.all()
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

	//
	// Collect descriptor titles.
	//
	const codes = Object.keys(descriptors)
	cursor = await db.query(aql`
			LET result = (
				FOR code IN ${codes}
				RETURN DOCUMENT(${db.collection(kDb.collection_terms)}, code)._info._title.iso_639_3_eng )
			RETURN
				ZIP(result, ${codes})
		`)
	records = await cursor.all()

	//
	// Write number of data points.
	//
	let report = "Descriptor\tNumber of data points\n"
	for(const name of Object.keys(records[0]).sort()) {
		report += `${name} - [${records[0][name]}]`
		report += "\t"
		report += descriptors[records[0][name]]
		report += "\n"
	}

	//
	// Write to file.
	//
	fs.writeFileSync(theFileName, report)

} // WriteDataPoints()

/**
 * Write species
 * This function will write a tab-delimited file containing all descriptors
 * by species and number of data points.
 * @param theFileName {String}: File path.
 * @return {Promise<void>}
 */
async function WriteSpecies(theFileName)
{
	//
	// Init local storage.
	//
	let table = {}
	let descriptors = {}

	//
	// Collect species and descriptors.
	//
	let cursor = await db.query(aql`
			FOR item IN ${db.collection(kDb.collection_char)}
				FILTER HAS(item, "species")
			RETURN item
		`)
	let records = await cursor.all()

	//
	// Iterate
	for(const doc of records) {

		//
		// Set species.
		//
		let reference = null
		if(!table.hasOwnProperty(doc.species)) {
			table[doc.species] = {}
		}

		reference = table[doc.species]

		for(const property of Object.keys(doc)) {
			switch(property) {
				case '_key':
					continue

				case '_id':
					continue

				case '_rev':
					continue

				case 'species':
					continue

				default:
					descriptors[property] = null
					if(!reference.hasOwnProperty(property)) {
						reference[property] = 0
					} else {
						reference[property] += 1
					}
			}
		}
	}

	//
	// Collect descriptor titles.
	//
	const codes = Object.keys(descriptors)
	cursor = await db.query(aql`
			LET result = (
				FOR code IN ${codes}
				RETURN DOCUMENT(${db.collection(kDb.collection_terms)}, code)._info._title.iso_639_3_eng )
			RETURN
				ZIP(result, ${codes})
		`)
	records = await cursor.all()
	descriptors = records[0]

	//
	// Write number of data points.
	//
	let report = ""
	for(const descriptor of Object.keys(descriptors).sort()) {
		report += `\t${descriptor}`
	}
	report += "\n"
	for(const descriptor of Object.keys(descriptors).sort()) {
		report += `\t${descriptors[descriptor]}`
	}
	for(const species of Object.keys(table).sort()) {
		report += `\n${species}`
		for(const descriptor of Object.keys(descriptors).sort()) {
			if(table[species].hasOwnProperty(descriptors[descriptor])) {
				report += `\t${table[species][descriptors[descriptor]]}`
			} else {
				report += "\t"
			}
		}
	}

	//
	// Write to file.
	//
	fs.writeFileSync(theFileName, report)

} // WriteSpecies()

/**
 * Write countries
 * This function will write a tab-delimited file containing all descriptors
 * by country and number of data points.
 * @param theFileName {String}: File path.
 * @return {Promise<void>}
 */
async function WriteCountries(theFileName)
{
	//
	// Init local storage.
	//
	let table = {}
	let descriptors = {}
	let countries = {}

	//
	// Collect species and descriptors.
	//
	let cursor = await db.query(aql`
			FOR item IN ${db.collection(kDb.collection_char)}
				FILTER HAS(item, "gcu_id_number")
			RETURN item
		`)
	let records = await cursor.all()

	//
	// Iterate
	for(const doc of records) {

		//
		// Set country.
		//
		let reference = null
		const code = doc.gcu_id_number.substring(0, 3)
		if(code.length == 0) {
			continue
		}
		if(!table.hasOwnProperty(code)) {
			table[code] = {}
		}

		reference = table[code]

		for(const property of Object.keys(doc)) {
			switch(property) {
				case '_key':
					continue

				case '_id':
					continue

				case '_rev':
					continue

				case 'gcu_id_number':
					continue

				default:
					descriptors[property] = null
					if(!reference.hasOwnProperty(property)) {
						reference[property] = 0
					} else {
						reference[property] += 1
					}
			}
		}
	}

	//
	// Cleanup table.
	//
	const regexp = /[A-Z]{3}/;
	for(const key of Object.keys(table)) {
		if(key.match(regexp) === null) {
			delete table[key]
		}
	}

	//
	// Collect descriptor titles.
	//
	const codes = Object.keys(descriptors)
	cursor = await db.query(aql`
			LET result = (
				FOR code IN ${codes}
				RETURN DOCUMENT(${db.collection(kDb.collection_terms)}, code)._info._title.iso_639_3_eng )
			RETURN
				ZIP(result, ${codes})
		`)
	records = await cursor.all()
	descriptors = records[0]

	//
	// Collect country names.
	//
	const isos = Object.keys(table)
	cursor = await db.query(aql`
			LET result = (
				FOR code IN ${isos}
				RETURN DOCUMENT(${db.collection(kDb.collection_terms)}, CONCAT("iso_3166_1_", code))._info._title.iso_639_3_eng )
			RETURN
				ZIP(result, ${isos})
		`)
	records = await cursor.all()
	for(const item of Object.keys(records[0])) {
		if(item.length === 0) {
			delete records[0][item]
		}
	}
	countries = records[0]

	//
	// Write number of data points.
	//
	let report = ""
	for(const descriptor of Object.keys(descriptors).sort()) {
		report += `\t${descriptor}`
	}
	report += "\n"
	for(const descriptor of Object.keys(descriptors).sort()) {
		report += `\t${descriptors[descriptor]}`
	}
	for(const country of Object.keys(countries).sort()) {
		report += `\n${country}`
		for(const descriptor of Object.keys(descriptors).sort()) {
			if(table[countries[country]].hasOwnProperty(descriptors[descriptor])) {
				report += `\t${table[countries[country]][descriptors[descriptor]]}`
			} else {
				report += "\t"
			}
		}
	}

	//
	// Write to file.
	//
	fs.writeFileSync(theFileName, report)

} // WriteCountries()

main()
