/**
 * database.js
 *
 * Database utilities.
 */

const { Database, CollectionType } = require("arangojs")	// ArangoDB driver.

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.

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
	let collection = null
	for(item of collections) {
		console.log(`Dropping collection ${item.name}`)
		switch(item.name) {

			// Terms.
			case kPriv.user.db.terms_col:
				collection = db.collection(kPriv.user.db.terms_col)
				await collection.drop()
				break

			// Schema.
			case kPriv.user.db.edges_col:
				collection = db.collection(kPriv.user.db.edges_col)
				await collection.drop()
				break

			// Topo.
			case kPriv.user.db.topos_col:
				collection = db.collection(kPriv.user.db.topos_col)
				await collection.drop()
				break
		}
	}

	//
	// Create collections.
	//
	await InitTermCollection(db, kPriv.user.db.terms_col)
	await InitEdgeCollection(db, kPriv.user.db.edges_col)
	await InitTopoCollection(db, kPriv.user.db.topos_col)

	//
	// Create graphs.
	//
	await InitSchemaGraph(db)
	await InitTopoGraph(db)

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
	const collection = await db.createCollection(name)

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_codes_gid'],
		name: "idx-global-identifier",
		unique: true
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_codes_lid'],
		name: "idx-local-identifier",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_codes_aid[*]'],
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
	const collection = await db.createEdgeCollection(name)

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_from', '_rels_predicate'],
		name: "idx-schema-from-predicate",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_from', '_rels_path[*]'],
		name: "idx-schema-from-edge-paths",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_from', '_rels_predicate', '_rels_path[*]'],
		name: "idx-schema-from-edge-predicate-paths",
		unique: false
	})

	console.log(`Created edge collection ${name}`)

} // InitEdgeCollection()

/**
 * Initialise topos collection.
 * It expects the collection to have been previously dropped.
 * @param {Database} db - Database connection.
 * @param {string} name - Collection name.
 * @returns {Promise<void>}
 */
async function InitTopoCollection(db, name)
{
	//
	// Create collection.
	//
	const collection = await db.createEdgeCollection(name)

	//
	// Add indexes.
	//
	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_from', '_rels_predicate'],
		name: "idx-topo-from-predicate",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_from', '_rels_path[*]'],
		name: "idx-topo-from-edge-paths",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: ['_from', '_rels_predicate', '_rels_path[*]'],
		name: "idx-topo-from-edge-predicate-paths",
		unique: false
	})

	console.log(`Created topo collection ${name}`)

} // InitTopoCollection()

/**
 * Initislise schema graph.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function InitSchemaGraph(db)
{
	//
	// Instantiate graph.
	//
	const graph = db.graph('schema')

	//
	// Create graph.
	//
	const info = await graph.create([
		{
			collection: kPriv.user.db.edges_col,
			from: [kPriv.user.db.terms_col],
			to: [kPriv.user.db.terms_col],
		}
	]);

	console.log(`Created graph ${'schema'}`)

} // InitSchemaGraph()

/**
 * Initislise topo graph.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function InitTopoGraph(db)
{
	//
	// Instantiate graph.
	//
	const graph = db.graph('topo')

	//
	// Create graph.
	//
	const info = await graph.create([
		{
			collection: kPriv.user.db.topos_col,
			from: [kPriv.user.db.terms_col],
			to: [kPriv.user.db.terms_col],
		}
	]);

	console.log(`Created graph ${'topo'}`)

} // InitTopoaGraph()


module.exports = { InitDatabase }
