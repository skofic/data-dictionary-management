/**
 * database.js
 *
 * Database utilities.
 */

const { Database, CollectionType } = require("arangojs")	// ArangoDB driver.

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
	// Init collection names.
	//
	let col_terms = [kPriv.user.db.collections.core.terms]
	let col_edges = [kPriv.user.db.collections.core.edges]
	let col_errors = [kPriv.user.db.collections.errors]
	let col_topos = []

	//
	// Load collection names.
	//
	if(!kPriv.user.flag.only_core) {
		col_terms = col_terms.concat([
			kPriv.user.db.collections.geo.terms,
			kPriv.user.db.collections.std.terms,
			kPriv.user.db.collections.iso.terms,
		])
		col_edges = col_edges.concat([
			kPriv.user.db.collections.geo.edges,
			kPriv.user.db.collections.std.edges,
			kPriv.user.db.collections.iso.edges,
		])
		col_topos.push(kPriv.user.db.collections.topos)
		if(kPriv.user.flag.do_eufgis) {
			col_terms.push(kPriv.user.db.collections.eufgis.terms)
			col_edges.push(kPriv.user.db.collections.eufgis.edges)
		}
	}

	//
	// Drop graphs.
	//
	for(item of graphs) {
		console.log(`Dropping graph ${item.name}`)
		await db.graph(item.name).drop()
	}

	//
	// Drop collections.
	//
	for(item of collections) {
		console.log(`Dropping collection ${item.name}`)
		await db.collection(item.name).drop()
	}

	//
	// Create collections.
	//
	for(const name of col_terms) {
		await InitTermCollection(db, name)
	}
	for(const name of col_edges) {
		await InitEdgeCollection(db, name)
	}
	for(const name of col_topos) {
		await InitTopoCollection(db, name)
	}
	for(const name of col_errors) {
		await InitErrorCollection(db, name)
	}

	//
	// Create graphs.
	//
	await InitSchemaGraph(db)		// Creates only core graph.
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
	const collection = await db.createEdgeCollection(name)

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
		fields: ['_path[*]', '_predicate'],
		deduplicate: true,
		estimates: true,
		name: "idx-topo-path-predicate",
		unique: false
	})

	console.log(`Created topo collection ${name}`)

} // InitTopoCollection()

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
	const collection = await db.createCollection(name)

	console.log(`Created error collection ${name}`)

} // InitErrorCollection()

/**
 * Delete error collection.
 * It expects the collection to have been previously created.
 * This function is used after validating inserted documents.
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
 * Initialise schema graph.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function InitSchemaGraph(db)
{
	//
	// Init local storage.
	//
	const graphName = kPriv.user.db.graphs.core
	const edge_name = kPriv.user.db.collections.core.edges
	const subject_names = [kPriv.user.db.collections.core.terms]
	const object_names = [kPriv.user.db.collections.core.terms]

	//
	// Instantiate graph.
	//
	const graph = db.graph(graphName)

	//
	// Create graph.
	//
	const info = await graph.create([
		{
			collection: edge_name,
			from: subject_names,
			to: object_names,
		}
	]);

	console.log(`Created graph ${graphName}`)

} // InitSchemaGraph()

/**
 * Initislise topo graph.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function InitTopoGraph(db)
{
	//
	// Skip if only core.
	//
	if(!kPriv.user.flag.only_core) {

		//
		// Init local storage.
		//
		const graphName = kPriv.user.db.graphs.topo
		const edge_name = kPriv.user.db.collections.topos
		let subject_names = [
			kPriv.user.db.collections.core.terms,
			kPriv.user.db.collections.geo.terms,
			kPriv.user.db.collections.std.terms,
			kPriv.user.db.collections.iso.terms
		]
		if(kPriv.user.flag.do_eufgis) {
			subject_names.push(kPriv.user.db.collections.eufgis.terms)
		}
		let object_names = [
			kPriv.user.db.collections.geo.terms,
			kPriv.user.db.collections.std.terms,
			kPriv.user.db.collections.iso.terms
		]
		if(kPriv.user.flag.do_eufgis) {
			object_names.push(kPriv.user.db.collections.eufgis.terms)
		}

		//
		// Instantiate graph.
		//
		const graph = db.graph(graphName)

		//
		// Create graph.
		//
		const info = await graph.create([
			{
				collection: edge_name,
				from: subject_names,
				to: object_names,
			}
		]);

		console.log(`Created graph ${graphName}`)
	}

} // InitTopoaGraph()


module.exports = { InitDatabase, DropErrorCollection }
