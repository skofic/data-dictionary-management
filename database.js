/**
 * database.js
 *
 * Database utilities.
 */

const { Database } = require("arangojs")	// ArangoDB driver.

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
	// Iterate list of collections.
	//
	const collections = await db.listCollections(true)

	//
	// Drop collections.
	//
	var collection = null
	for(item of collections) {
		switch(item.name) {
			// Terms.
			case kPriv.user.db.terms_col:
				collection = db.collection(kPriv.user.db.terms_col)
				await collection.drop()
				console.log(`Dropped ${item.name}`)
				break
			// Schema.
			case kPriv.user.db.edges_col:
				collection = db.collection(kPriv.user.db.edges_col)
				await collection.drop()
				console.log(`Dropped ${item.name}`)
				break
			// Topo.
			case kPriv.user.db.topos_col:
				collection = db.collection(kPriv.user.db.topos_col)
				await collection.drop()
				console.log(`Dropped ${item.name}`)
				break
		}
	}

	//
	// Create collections.
	//
	InitTermCollection(db, kPriv.user.db.terms_col)
	InitEdgeCollection(db, kPriv.user.db.edges_col)
	InitEdgeCollection(db, kPriv.user.db.topos_col)

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
		fields: [kGlob.globals.ddict.gid],
		name: "idx-global-identifier",
		unique: true
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: [kGlob.globals.ddict.lid],
		name: "idx-local-identifier",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: [`${kGlob.globals.ddict.aid}[*]`],
		name: "idx-alias-identifiers",
		unique: false
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
		fields: [kGlob.globals.ddict.pred],
		name: "idx-predicate",
		unique: false
	})

	await collection.ensureIndex({
		type: 'persistent',
		fields: [`${kGlob.globals.ddict.path}[*]`],
		name: "idx-edghe-paths",
		unique: false
	})

	console.log(`Created edge collection ${name}`)

} // InitEdgeCollection()

module.exports = { InitDatabase }
