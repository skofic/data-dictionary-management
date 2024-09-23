/**
 * database.js
 *
 * Database utilities.
 */

const { Database, CollectionType } = require("arangojs")	// ArangoDB driver.

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.
const kDb = require('./db.globals')			// Database globals.

/**
 * Initialise database.
 * This function will:
 * - Clear the database, by deleting the term, schema and topo collections,
 * - Create the collections and set indexes.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function InitDatabase(db)
{
	//
	// Set local storage.
	//
	const graphs = await db.listGraphs()
	const collections = await db.listCollections(true)

	//
	// Drop graphs.
	//
	let graph = null
	for(item of graphs) {
		console.log(`Dropping graph ${item.name}`)
		const graph = db.graph(item.name)
		await graph.drop()
	}

	//
	// Drop collections.
	//
	for(item of collections) {

		//
		// Drop all.
		//
		if(kPriv.user.flag.drop_all_collections) {
			console.log(`Dropping collection ${item.name}`)
			await db.collection(item.name).drop()
		}

		//
		// Truncate if relevant.
		//
		else {
			switch(item.name) {

				// Terms.
				case kDb.collection_terms:
					await db.collection(kDb.collection_terms).truncate()
					break

				// Schema.
				case kDb.collection_edges:
					await db.collection(kDb.collection_edges).truncate()
					break

				// Links.
				case kDb.collection_links:
					await db.collection(kDb.collection_links).truncate()
					break

				// // Topo.
				// case kDb.collection_topos:
				// 	await db.collection(kDb.collection_topos).truncate()
				// 	break

				// Characterisation.
				case kDb.collection_char:
					if(kPriv.user.flag.drop_characterisation) {
						await db.collection(kDb.collection_char).truncate()
					}
					break

				// Errors.
				case kDb.collection_errors:
					await db.collection(kDb.collection_errors).truncate()
					break
			}
		}
	}

	//
	// Create collections.
	//
	await InitTermCollection(db, kDb.collection_terms)
	await InitEdgeCollection(db, kDb.collection_edges)
	await InitLinksCollection(db, kDb.collection_links)
	// Topos are no longer there.
	// await InitTopoCollection(db, kDb.collection_topos)
	await InitErrorCollection(db, kDb.collection_errors)
	if(kPriv.user.flag.drop_characterisation) {
		await InitCharCollection(db, kDb.collection_char)
	}

} // InitDatabase()

/**
 * Initialise term collection.
 * It expects the collection to have been previously dropped.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function InitTermCollection(db, name)
{
	//
	// Create collection.
	//
	let collection = db.collection(name)
	if(!await collection.exists()) {
		collection = await db.createCollection(name)
	}

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_code._gid'],
		name: "idx-global-identifier",
		unique: true
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_code._lid'],
		name: "idx-local-identifier",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_code._aid[*]'],
		name: "idx-alias-identifiers",
		unique: false,
		sparse: true
	})

	console.log(`Created term collection ${name}`)

} // InitTermCollection()

/**
 * Initialise edge collection.
 * It expects the collection to have been previously dropped.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function InitEdgeCollection(db, name)
{
	//
	// Create collection.
	//
	let collection = db.collection(name)
	if(!await collection.exists()) {
		collection = await db.createEdgeCollection(name)
	}

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_path[*]', '_predicate'],
		deduplicate: true,
		estimates: true,
		name: "idx-schema-path-predicate",
		unique: false
	})

	console.log(`Created edge collection ${name}`)

} // InitEdgeCollection()

/**
 * Initialise links collection.
 * It expects the collection to have been previously dropped.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function InitLinksCollection(db, name)
{
	//
	// Create collection.
	//
	let collection = db.collection(name)
	if(!await collection.exists()) {
		collection = await db.createEdgeCollection(name)
	}

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_predicate'],
		deduplicate: true,
		estimates: true,
		name: "idx-schema-path-predicate",
		unique: false
	})

	console.log(`Created links collection ${name}`)

} // InitLinksCollection()

/**
 * Initialise error collection.
 * It expects the collection to have been previously dropped.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function InitErrorCollection(db, name)
{
	//
	// Create collection.
	//
	let collection = db.collection(name)
	if(!await collection.exists()) {
		collection = await db.createCollection(name)
	}

	console.log(`Created error collection ${name}`)

} // InitErrorCollection()

/**
 * Delete error collection.
 * It expects the collection to have been previously created.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function DropErrorCollection(db, name)
{
	//
	// Drop collection.
	//
	const collection = await db.collection(name)
	await collection.drop()

	console.log(`Dropped collection ${name}`)

} // DropErrorCollection()

/**
 * Initialise characterisation collection.
 * It expects the collection to have been previously dropped.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function InitCharCollection(db, name)
{
	//
	// Create collection.
	//
	let collection = db.collection(name)
	if(!await collection.exists()) {
		collection = await db.createCollection(name)
	}

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['species'],
		deduplicate: true,
		estimates: true,
		name: "idx-char-species",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['gcu_id_number'],
		deduplicate: true,
		estimates: true,
		name: "idx-char-gcu",
		unique: false
	})

	await collection.ensureIndex({
		type: 'geo',
		fields: ['std_location'],
		geoJson: true,
		sparse: true,
		name: "idx-char-location",
		unique: false
	})

	console.log(`Created characterisation collection ${name}`)

} // InitCharCollection()


module.exports = { InitDatabase, DropErrorCollection }
