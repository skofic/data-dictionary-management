/**
 * processing.js
 *
 * This file contains functions that process and generate JSON files.
 */

const fs = require("fs")						// File system utilities.
const pt = require("path")						// Directory path helper.
const md5 = require("md5")						// MD5 hash library.
const { Database, aql } = require("arangojs")	// ArangoDB driver.

const kGlob = require('./globals')				// Generic globals.
const kPriv = require('./user.globals')			// User-provided globals.
const kDb = require('./db.globals')				// Database globals.

/**
 * Process base files.
 *
 * The function will process all JSON files contained in the base data directory.
 * These files have been filled by hand and they constitute the core of the data dictionary.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function ProcessDictionaryFiles(db) {

	//
	// Process term files.
	//
	await ProcessFiles(
		db,										// Database connection.
		kDb.collection_terms,					// Database collection name.
		GetFilesList(
			kGlob.globals.path.base,			// Source data files directory.
			'.json', 					// File extension.
			kGlob.globals.file_prefixes.term	// Selection name prefixes.
		),
		ProcessTerm 							// Object processing callback.
	)

	//
	// Process edge files.
	//
	await ProcessFiles(
		db,										// Database connection.
		kDb.collection_edges,				// Database collection name.
		GetFilesList(
			kGlob.globals.path.base,			// Source data files directory.
			'.json', 					// File extension.
			kGlob.globals.file_prefixes.edge	// Selection name prefixes.
		),
		ProcessEdge								// Object processing callback.
	)

} // ProcessDictionaryFiles()

/**
 * Process ISO standards.
 * Scan the three external repositories and combine the data into a graph of ISO standards.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function ProcessIsoStandards(db) {

	//
	// Handle ISO 639 languages.
	//
	await LoadIso639_3(db)	// ISO 639-3.
	await LoadIso639_1(db)	// ISO 639-1.
	await LoadIso639_2(db)	// ISO 639-2.
	await LoadIso639_5(db)	// ISO 639-5.

	//
	// Handle ISO 4217 currencies.
	//
	await LoadIso4217(db)	// ISO 4217.

	//
	// Handle ISO 15924 currencies.
	//
	await LoadIso15924(db)	// ISO 15924.

	//
	// Handle ISO 3166 countries.
	//
	await LoadIso3166_1(db)	// ISO 3166-1.
	await LoadIso3166_2(db)	// ISO 3166-2.
	await LoadIso3166_3(db)	// ISO 3166-3.

} // ProcessIsoStandards()

/**
 * Validate database term records.
 * Scan all terms and ensure that all references are valid.
 * The checks will validate the following:
 * - Code section: ensure record has code section.
 * - Code properties: ensure record has _lid, _gid and _aid.
 * - Namespace: Ensure _code._nid is valid.
 * - Global identifier: Should match key.
 * - Class: Check class.
 * - Type: Check type and type-key.
 * - Kind: check type reference.
 * - Format: check format.
 * - Unit: check unit.
 * - Required: ensure all descriptor references are valid.
 * - Recommended: ensure all descriptor references are valid.
 * - Banned, computed, locked, immutable: check references.
 * - Default value: check that properties refer to descriptors.
 *
 * If there are errors, the information will be written to the errors
 * collection which has the following structure:
 * - collection: Name of the database collection of the offending document.
 * - key: Key of the offending document.
 * - property: Name of the offending property.
 * - value: Offending value, or null if it is a missing value.
 * @param db - Database connection.
 * @returns {Promise<Number>}
 */
async function ValidateTerms(db) {

	//
	// Init local storage.
	//
	let error_count = 0
	let cache = new Set()
	const collection = db.collection(kDb.collection_terms);
	const error_collection = db.collection(kPriv.user.db.error_col)

	//
	// Query all terms.
	//
	console.log(`==> Querying all terms`)
	const terms = await db.query(aql`
      FOR term IN ${collection}
      RETURN term
    `);

	//
	// Iterate all terms.
	//
	console.log(`==> Iterating all terms`)
	for await (const term of terms) {

		//
		// Init loop storage.
		//
		let errors = []
		let key = term._key

		//
		// Validate sections.
		//
		if(term.hasOwnProperty('_code')) {
			errors = errors.concat(await ValidateCodeSection(term._code, key, cache, collection))
		}
		else {
			errors.push({
				"collection": collection.name,
				"key": key,
				"property": '_code',
				"value": null
			})
		}
		if(term.hasOwnProperty('_info')) {
			errors = errors.concat(await ValidateInfoSection(term._info, key, cache, collection))
		}
		if(term.hasOwnProperty('_data')) {
			errors = errors.concat(await ValidateDataSection(term._data, key, cache, collection))
		}
		if(term.hasOwnProperty('_rule')) {
			errors = errors.concat(await ValidateRuleSection(term._rule, key, cache, collection))
		}

		//
		// Write errors.
		//
		if(errors.length > 0) {
			error_count += errors.length
			await error_collection.import(errors)
			errors = []
		}
	}

	return error_count																// ==>

} // ValidateTerms()

/**
 * Validate database edge records.
 * Scan all edges and ensure that all references are valid.
 * The checks will validate the following:
 * - Predicate: ensure predicate exists.
 * - Path: ensure all elements exist.
 * If there are errors, the record will be displayed and the error will be printed,
 * then an exception will be thrown.
 * @param db - Database connection.
 * @returns {Promise<void>} */
async function ValidateEdges(db) {

	//
	// Init local storage.
	//
	let error_count = 0
	let cache = new Set()
	const collection = db.collection(kDb.collection_edges)
	const terms_collection = db.collection(kDb.collection_terms)
	const error_collection = db.collection(kPriv.user.db.error_col)

	//
	// Query all terms.
	//
	console.log(`==> Querying all edges`)
	const edges = await db.query(aql`
      FOR edge IN ${collection}
      RETURN edge
    `);

	//
	// Iterate all edges.
	//
	console.log(`==> Iterating all edges`)
	for await (const edge of edges) {

		//
		// Init loop storage.
		//
		let errors = []
		let key = edge._key

		//
		// Validate sections.
		//
		errors = await ValidateEdgeSection(edge, key, cache, collection, terms_collection)
		if(errors.length > 0) {
			error_count += errors.length
			await error_collection.import(errors)
			errors = []
		}
	}

	return error_count																// ==>

} // ValidateEdges()

/**
 * Validate database topo records.
 * Scan all edges and ensure that all references are valid.
 * The checks will validate the following:
 * - Predicate: ensure predicate exists.
 * - Path: ensure all elements exist.
 * If there are errors, the record will be displayed and the error will be printed,
 * then an exception will be thrown.
 * @param db - Database connection.
 * @returns {Promise<void>} */
async function ValidateTopos(db) {

	//
	// Init local storage.
	//
	let error_count = 0
	let cache = new Set()
	const collection = db.collection(kDb.collection_topos)
	const terms_collection = db.collection(kDb.collection_terms)
	const error_collection = db.collection(kPriv.user.db.error_col)

	//
	// Query all terms.
	//
	console.log(`==> Querying all topos`)
	const edges = await db.query(aql`
      FOR edge IN ${collection}
      RETURN edge
    `);

	//
	// Iterate all edges.
	//
	console.log(`==> Iterating all topos`)
	for await (const edge of edges) {

		//
		// Init loop storage.
		//
		let errors = []
		let key = edge._key

		//
		// Validate sections.
		//
		errors = await ValidateEdgeSection(edge, key, cache, collection, terms_collection)
		if(errors.length > 0) {
			error_count += errors.length
			await error_collection.import(errors)
			errors = []
		}
	}

	return error_count																// ==>

} // ValidateTopos()

/**
 * Validate code section.
 * This function will validate the term code section and log to console all properties that
 * have at least one error, by displaying the term key and the invalid terms or descriptors.
 * @param section {object} - Term section.
 * @param key {string} - Term key.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database collection.
 * @returns {Promise<[{object}]>} - List of properties with errors.
 */
async function ValidateCodeSection(section, key, cache, collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.

	//
	// Check namespace.
	//
	if(section.hasOwnProperty('_nid') && section._nid.length > 0) {
		if(!cache.has(section._nid)) {
			const exists = await collection.documentExists(section._nid)
			if(exists) {
				cache.add(section._nid)
			} else {
				errors.push({
					"collection": collection.name,
					"key": key,
					"property": '_code._nid',
					"value": section._nid
				})
			}
		}
	}

	return errors																	// ==>

} // ValidateCodeSection()

/**
 * Validate documentation section.
 * This function will validate the term documentation section and log to console all properties that
 * have at least one error, by displaying the term key and the invalid terms or descriptors.
 * @param section {object} - Term section.
 * @param key {string} - Term key.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database collection.
 * @returns {Promise<[{string}]>} - List of properties with errors.
 */
async function ValidateInfoSection(section, key, cache, collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.

	//
	// Check documentation properties.
	//
	Object.getOwnPropertyNames(section)
		.forEach( (property) => {
			Object.getOwnPropertyNames(section[property])
				.forEach( async (language) => {
					if(!cache.has(language)) {
						const exists = await collection.documentExists(language)
						if(exists) {
							cache.add(language)
						} else {
							errors.push({
								"collection": collection.name,
								"key": key,
								"property": '_info.' + property,
								"value": language
							})
						}
					}
				})
		})

	return errors																	// ==>

} // ValidateCodeSection()

/**
 * Validate data section.
 * This function will validate the term data section and log to console all properties that
 * have at least one error, by displaying the term key and the invalid terms or descriptors.
 * @param section {object} - Term section.
 * @param key {string} - Term key.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database collection.
 * @returns {Promise<[{string}]>} - List of properties with errors.
 */
async function ValidateDataSection(section, key, cache, collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.

	//
	// Check namespace.
	//
	Object.getOwnPropertyNames(section)
		.forEach( async (container) => {
			switch(container) {
				case '_dict':
					if((!section[container].hasOwnProperty('_dict_key'))
						|| (!section[container].hasOwnProperty('_dict_value'))) {
						if(!section[container].hasOwnProperty('_dict_key')) {
							errors.push({
								"collection": collection.name,
								"key": key,
								"property": '_data._dict._dict_key',
								"value": null
							})
						}
						if(!section[container].hasOwnProperty('_dict_value')) {
							errors.push({
								"collection": collection.name,
								"key": key,
								"property": '_data._dict._dict_value',
								"value": null
							})
						}
					} else {
						errors = errors.concat(
							await ValidateDataElements(
								section[container]._dict_key,
								key,
								'_dict._dict_key',
								cache,
								collection
							)
						)
						errors = errors.concat(
							await ValidateDataElements(
								section[container]._dict_value,
								key,
								'_dict._dict_value',
								cache,
								collection
							)
						)
					}
					break

				default:
					if(Object.entries(section).length > 0) {
						errors = errors.concat(
							await ValidateDataElements(
								section,
								key,
								container,
								cache,
								collection
							)
						)
					}
					break
			}
		})

	return errors																	// ==>

} // ValidateDataSection()

/**
 * Validate rule section.
 * This function will validate the term rule section and log to console all properties that
 * have at least one error, by displaying the term key and the invalid terms or descriptors.
 * @param section {object} - Term section.
 * @param key {string} - Term key.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database collection.
 * @returns {Promise<[{string}]>} - List of properties with errors.
 */
async function ValidateRuleSection(section, key,  cache, collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.
	let exceptions = []					// Reset error elements.

	//
	// Check section.
	//
	Object.getOwnPropertyNames(section)
		.forEach( async (container) => {
			switch(container) {
				case '_required':
				case '_recommended':
					Object.getOwnPropertyNames(section[container])
						.forEach( async (selector) => {
							exceptions = []
							section[container][selector]
								.forEach( async (element) => {
									if(Array.isArray(element)) {
										element
											.forEach( async (item) => {
												exceptions.push(
													await ValidateDescriptorReference(item, cache, collection)
												)
											})
									} else {
										exceptions.push(
											await ValidateDescriptorReference(element, cache, collection)
										)
									}
								})
							if(exceptions.length > 0) {
								errors.push({
									"collection": collection.name,
									"key": key,
									"property": '_rule-' + container + '.' + selector,
									"value": exceptions
								})
							}
						})
					break

				case '_banned':
				case '_computed':
				case '_locked':
				case '_immutable':
					exceptions = []
					section[container]
						.forEach( async (element) => {
							exceptions.push(
								await ValidateDescriptorReference(element, cache, collection)
							)
						})
					if(exceptions.length > 0) {
						errors.push({
							"collection": collection.name,
							"key": key,
							"property": '_rule-' + container,
							"value": exceptions
						})
					}
					break

				case "_default-value":
					exceptions = []
					Object.getOwnPropertyNames(section[container])
						.forEach( async (element) => {
							exceptions.push(
								await ValidateDescriptorReference(element, cache, collection)
							)
						})
					if(exceptions.length > 0) {
						errors.push({
							"collection": collection.name,
							"key": key,
							"property": '_rule-' + container,
							"value": exceptions
						})
					}
					break
			}
		})

	return errors																	// ==>

} // ValidateRuleSection()

/**
 * Validate data elements.
 * This function will validate the term data section elements and log to console all properties that
 * have at least one error, by displaying the term key and the invalid terms or descriptors.
 * @param section {object} - Term section.
 * @param key {string} - Term key.
 * @param field {string} - Term field name.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database collection.
 * @returns {Promise<[{string}]>} - List of properties with errors.
 */
async function ValidateDataElements(section, key, field, cache, collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.

	//
	// Check namespace.
	//
	Object.getOwnPropertyNames(section)
		.forEach( async (element) => {
			let value = section[element]
			switch(element) {
				case '_class':
				case '_type':
				case '_type_key':
				case '_format':
				case '_unit':
					if(!cache.has(value)) {
						const exists = await collection.documentExists(value)
						if(exists) {
							cache.add(value)
						} else {
							errors.push({
								"collection": collection.name,
								"key": key,
								"property": field + '.' + element,
								"value": value
							})
						}
					}
					break

				case '_kind':
					value.forEach( async (kind) => {
						if(!cache.has(kind)) {
							const exists = await collection.documentExists(kind)
							if(exists) {
								cache.add(kind)
							} else {
								errors.push({
									"collection": collection.name,
									"key": key,
									"property": field + '.' + element,
									"value": kind
								})
							}
						}
					})
					break

				default:
					break
			}
		})

	return errors																	// ==>

} // ValidateDataElements()

/**
 * Validate descriptor elements.
 * This function will validate the provided value ensuring it is a term reference,
 * but also that the referenced term is a descriptor.
 * @param reference {string} - Term reference.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database collection.
 * @returns {Promise<[{string}]>} - List of properties with errors.
 */
async function ValidateDescriptorReference(reference, cache, collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.

	//
	// Load term.
	//
	const term = await collection.document(reference, { graceful: true });
	if (term) {
		if(! cache.has(reference)) {
			cache.add(reference)
		}
		if(! term.hasOwnProperty('_data')) {
			errors.push("!NOT A DESCRIPTOR!")
		}
	} else {
		errors.push(reference)
	}

	return errors																	// ==>

} // ValidateDescriptorReference()

/**
 * Validate edge.
 * This function will validate the edge elements and log to console all properties that
 * have at least one error, by displaying the term key and the invalid terms or descriptors.
 * @param section {object} - Edge.
 * @param key {string} - Edge key.
 * @param cache {Set} - Set of checked term keys.
 * @param collection - Database edge collection.
 * @param terms_collection - Database terms collection.
 * @returns {Promise<[{string}]>} - List of properties with errors.
 */
async function ValidateEdgeSection(section, key, cache, collection, terms_collection) {

	//
	// Init local storage.
	//
	let errors = []						// Reset errors list.
	let terms_collection_name = terms_collection.name

	//
	// Check missing properties.
	//
	if(! section.hasOwnProperty('_predicate')) {
		errors.push({
			"collection": collection.name,
			"key": key,
			"property": '_predicate',
			"value": null
		})
	}
	if(! section.hasOwnProperty('_path')) {
		errors.push({
			"collection": collection.name,
			"key": key,
			"property": '_path',
			"value": null
		})
	}

	//
	// Check properties.
	//
	if(errors.length === 0) {
		let exists = false

		//
		// _from
		//
		if(! cache.has(section._from.substring(terms_collection_name.length + 1))) {
			exists = await terms_collection.documentExists(section._from)
			if(exists) {
				cache.add(section._from.substring(terms_collection_name.length + 1))
			} else {
				errors.push({
					"collection": collection.name,
					"key": key,
					"property": '_from',
					"value": section._from
				})
			}
		}

		//
		// _to
		//
		if(! cache.has(section._to.substring(terms_collection_name.length + 1))) {
			exists = await terms_collection.documentExists(section._to)
			if(exists) {
				cache.add(section._to.substring(terms_collection_name.length + 1))
			} else {
				errors.push({
					"collection": collection.name,
					"key": key,
					"property": '_to',
					"value": section._to
				})
			}
		}

		//
		// Predicate.
		//
		if(!cache.has(section._predicate)) {
			exists = await terms_collection.documentExists(section._predicate)
			if(exists) {
				cache.add(section._predicate)
			} else {
				errors.push({
					"collection": collection.name,
					"key": key,
					"property": '_predicate',
					"value": section._predicate
				})
			}
		}

		//
		// Path.
		//
		section._path
			.forEach( async (element) => {
				if(!cache.has(element)) {
					exists = await terms_collection.documentExists(element)
					if(exists) {
						cache.add(element)
					} else {
						errors.push({
							"collection": collection.name,
							"key": key,
							"property": '_path',
							"value": element
						})
					}
				}
			})

	}

	return errors																	// ==>

} // ValidateEdgeSection()

/********************************************************************************/
/* FUNCTIONS AND UTILITIES SECTION												*/
/********************************************************************************/

/**
 * Load ISO 639-1 standard.
 * We do not have a specific repository for ISO 639-1, but we know that the standard uses the
 * 2 character codes, so I use the ISO 639-3 records that have a 2 character code.
 * Note that all ISO 639-1 enumerations are bridged to their ISO 639-3 counterparts, the ISO 639-1
 * terms will only have the codes, the names are not duplicated.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso639_1(db) {
	console.log(`\n==> Handling ISO 639-1`)

	//
	// Read objects.
	// We store locally all ISO 639-3 terms that have alpha-2 code,
	// we reset all buffers,
	// and fill buffers with ISO 639-1 data.
	//
	console.log(`  ??? Loading buffers`)
	let terms = []
	for(const [alpha2, alpha3] of Object.entries(kGlob.globals.dec.iso_639_1_to_3)) {
		terms.push(kGlob.globals.res.terms[alpha3])
	}

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Create terms, edges and fill buffers by iterating ISO 639-3 terms
	// that have alpha-2 code.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso639_1)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.639.1'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.639.1'
	)

} // LoadIso639_1()

/**
 * Load ISO 639-2 standard.
 * The standard is loaded as follows:
 * - Read the JSON file containing codes, english name, scope and type.
 * - Iterate (iso-codes) JSON source and create term and edge objects adding them to global buffer.
 * - Scan (iso-codes) related PO files related to specific ISO 639-2 entries and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * Note that some terms may be bridged to their related ISO 639-3 counterparts,
 * in that case the terms will only feature codes.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso639_2(db) {
	console.log(`\n==> Handling ISO 639-2`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_639-2' + '.json')
				)
			)
		)['639-2']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso639_2)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_639-2',
		/^#\. (.+) for ([a-z]{3})$/,
		/^msgstr "(.+)"$/,
		TranslateIso639_2
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.639.2'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.639.2'
	)

} // LoadIso639_2()

/**
 * Load ISO 639-3 standard.
 * The standard is loaded as follows:
 * - Read the JSON file containing codes, english name, scope and type.
 * - Iterate (iso-codes) JSON source and create term and edge objects adding them to global buffer.
 * - Scan (iso-codes) related PO files directory and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso639_3(db) {
	console.log(`\n==> Handling ISO 639-3`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_639-3' + '.json')
				)
			)
		)['639-3']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso639_3)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_639-3',
		/^#\. (.+) for ([a-z]{3})$/,
		/^msgstr "(.+)"$/,
		TranslateIso639_3
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.639.3'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.639.3'
	)

} // LoadIso639_3()

/**
 * Load ISO 639-5 standard.
 * The standard is loaded as follows:
 * - Read the (iso-codes) JSON file containing codes and english name.
 * - Iterate and create term and edges: bridge to ISO 639-3 or ISO 639-2 if needed.
 * - Scan (iso-codes) PO files related to specific ISO 639-5 elements and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * Note that some terms may be bridged to their related ISO 639-3 counterparts,
 * in that case the terms will only feature codes.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso639_5(db) {
	console.log(`\n==> Handling ISO 639-5`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_639-5' + '.json')
				)
			)
		)['639-5']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso639_5)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_639-5',
		/^#\. (.+) for ([a-z]{3})$/,
		/^msgstr "(.+)"$/,
		TranslateIso639_5
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.639.5'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.639.5'
	)

} // LoadIso639_5()

/**
 * Load ISO 4217 standard.
 * The standard is loaded as follows:
 * - Read the JSON file containing codes, english name, scope and type.
 * - Iterate (iso-codes) JSON source and create term and edge objects adding them to global buffer.
 * - Scan (iso-codes) related PO files directory and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso4217(db) {
	console.log(`\n==> Handling ISO 4217`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_4217' + '.json')
				)
			)
		)['4217']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso4217)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_4217',
		/^#\. (.+) for ([A-Z]{3})$/,
		/^msgstr "(.+)"$/,
		TranslateIso4217
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.4217'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.4217'
	)

} // LoadIso4217()

/**
 * Load ISO 15924 standard.
 * The standard is loaded as follows:
 * - Read the JSON file containing codes, english name, scope and type.
 * - Iterate (iso-codes) JSON source and create term and edge objects adding them to global buffer.
 * - Scan (iso-codes) related PO files directory and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso15924(db) {
	console.log(`\n==> Handling ISO 15924`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_15924' + '.json')
				)
			)
		)['15924']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso15924)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_15924',
		/^#\. (.+) for ([A-Za-z]{4})$/,
		/^msgstr "(.+)"$/,
		TranslateIso15924
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.15924'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.15924'
	)

} // LoadIso15924()

/**
 * Load ISO 3166-1 standard.
 * The standard is loaded as follows:
 * - Read the JSON file containing codes, english name, scope and type.
 * - Iterate (iso-codes) JSON source and create term and edge objects adding them to global buffer.
 * - Scan (iso-codes) related PO files directory and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso3166_1(db) {
	console.log(`\n==> Handling ISO 3166-1`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []
	kGlob.globals.res.topos = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_3166-1' + '.json')
				)
			)
		)['3166-1']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso3166_1)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_3166-1',
		/^#\. (.+) for ([A-Z]{3})$/,
		/^msgstr "(.+)"$/,
		TranslateIso3166_1
	)

	//
	// Load ancillary data.
	//
	console.log(`  ??? Reading country references`)
	JSON.parse(
		fs.readFileSync(
			pt.resolve(
				pt.join(kGlob.globals.path.country, 'countries' + '.json')
			)
		)

	).forEach(ProcessCountryReferences)

	//
	// Load country flags.
	//
	for(const [code, file] of Object.entries(
		GetFilesList(
			kGlob.globals.path.flags,
			'.svg',
			prefix = [],
			length = 2
		)
	)) {
		//
		// Set flag.
		//
		const key = code.toUpperCase()
		if(kGlob.globals.dec.iso_3166_A2_to_A3.hasOwnProperty(key)) {
			kGlob.globals.res.terms[kGlob.globals.dec.iso_3166_A2_to_A3[key]]['std_country_flag'] =
				fs.readFileSync(file, 'utf8')
		}
	}

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.3166.1'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.3166.1'
	)

	//
	// Write topos.
	//
	await ProcessItems(
		db,
		kDb.collection_topos,
		kGlob.globals.res.topos,
		ProcessEdge,
		'topo.iso.3166.1'
	)

} // LoadIso3166_1()

/**
 * Load ISO 3166-2 standard.
 * The standard is loaded as follows:
 * - Iterate the (iso-codes) JSON file and load it.
 * - Create the subdivision and subdivision type terms.
 * - Create the edges.
 * - Scan (iso-codes) related PO files directory and load translations.
 * - Write type terms to file, if preferences say so, and insert terms into database.
 * - Write subdivision terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * - Write topos to file, if preferences say so, and insert edges into database.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso3166_2(db) {
	console.log(`\n==> Handling ISO 3166-2`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.types = {}
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []
	kGlob.globals.res.topos = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_3166-2' + '.json')
				)
			)
		)['3166-2']

	//
	// Fill buffers with subdivisions and subdivision type terms.
	//
	console.log(`  ??? Loading subdivision terms`)
	terms.forEach(CreateIso3166_2_terms)

	//
	// Fill buffers with subdivisions and subdivision type edges.
	//
	console.log(`  ??? Loading subdivision edges`)
	CreateIso3166_2_edges(terms)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_3166-2',
		/^#\. (.+)$/,
		/^msgstr "(.+)"$/,
		TranslateIso3166_2
	)

	//
	// Write types.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.types),
		ProcessTerm,
		'enumeration.iso.3166.2.types'
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.3166.2'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.3166.2'
	)

	//
	// Write topos.
	//
	await ProcessItems(
		db,
		kDb.collection_topos,
		kGlob.globals.res.topos,
		ProcessEdge,
		'topo.iso.3166.2'
	)

} // LoadIso3166_2()

/**
 * Load ISO 3166-3 standard.
 * The standard is loaded as follows:
 * - Read the JSON file containing codes, english name, scope and type.
 * - Iterate (iso-codes) JSON source and create term and edge objects adding them to global buffer.
 * - Scan (iso-codes) related PO files directory and load translations.
 * - Write terms to file, if preferences say so, and insert terms into database.
 * - Write edges to file, if preferences say so, and insert edges into database.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso3166_3(db) {
	console.log(`\n==> Handling ISO 3166-3`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  ??? Reading objects`)
	const terms =
		JSON.parse(
			fs.readFileSync(
				pt.resolve(
					pt.join(kGlob.globals.path.iso_json, 'iso_3166-3' + '.json')
				)
			)
		)['3166-3']

	//
	// Fill buffers.
	//
	console.log(`  ??? Loading buffers`)
	terms.forEach(CreateIso3166_3)

	//
	// Load translations.
	//
	console.log(`  ??? Loading translations`)
	TranslateIso(
		'iso_3166-3',
		/^#\. (.+) for ([A-Z]{4})$/,
		/^msgstr "(.+)"$/,
		TranslateIso3166_3
	)

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kDb.collection_terms,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'enumeration.iso.3166.3'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kDb.collection_edges,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schema.iso.3166.3'
	)

} // LoadIso3166_3()

/**
 * Fill term and edge buffers with ISO 639-3 objects.
 * @param {object} item - ISO 639-3 object.
 */
function CreateIso639_1(item) {

	//
	// Init local storage.
	//
	const nid = "iso_639_1"
	const lid = item.iso_639_alpha2
	const gid = nid + kGlob.globals.token.ns + lid
	const codes = item._code._aid

	//
	// Create and load term in buffer.
	//
	kGlob.globals.res.terms[lid] = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: codes
		}
	}

	//
	// Create bridge edge.
	//
	kGlob.globals.res.edges.push({
		_from: gid,
		_to: nid,
		_predicate: '_predicate_bridge-of',
		_path: [nid]
	})

	//
	// Create enumeration edge.
	//
	kGlob.globals.res.edges.push({
		_from: item._code._gid,
		_to: gid,
		_predicate: '_predicate_enum-of',
		_path: [nid]
	})

} // CreateIso639_1()

/**
 * Fill term and edge buffers with ISO 639-2 objects.
 * Some elements will be bridged to their ISO 639-3 counterpart.
 * Note that some codes are not 2 characters long: these elements will be skipped.
 * @param {object} item - ISO 639-2 object.
 */
function CreateIso639_2(item) {

	//
	// Skip codes that are not 3 characters long.
	//
	if(item['alpha_3'].length !== 3) {
		return																		// ==>
	}

	//
	// Init local storage.
	//
	const nid = "iso_639_2"
	const lid = item['alpha_3']
	const gid = nid + kGlob.globals.token.ns + lid

	//
	// Init variables.
	//
	let codes = []

	//
	// Load term codes list and decoding tables.
	//
	Array("alpha_2", "alpha_3", "bibliographic").forEach( (key) => {
		if(item.hasOwnProperty(key)) {
			codes.push(item[key])
		}
	})

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: codes
		}
	}

	//
	// Handle bridged term.
	//
	if(kGlob.globals.dec.iso_639_3_codes.has(lid)) {

		//
		// Create bridge edge.
		//
		kGlob.globals.res.edges.push({
			_from: gid,
			_to: nid,
			_predicate: '_predicate_bridge-of',
			_path: [nid]
		})

		//
		// Create enumeration edge.
		//
		kGlob.globals.res.edges.push({
			_from: 'iso_639_3' + kGlob.globals.token.ns + lid,
			_to: gid,
			_predicate: '_predicate_enum-of',
			_path: [nid]
		})

	} // Has ISO 639-3 counterpart.

	//
	// Update term and create edge.
	//
	else {

		//
		// Save ISP 639-2 native code for later.
		//
		kGlob.globals.dec.iso_639_2_codes.add(lid)

		//
		// Set term name.
		//
		if(!term.hasOwnProperty('_info')) {
			term._info = {}
		}
		term['_info']['_title'] = {
			iso_639_3_eng: item['name']
		}

		//
		// Set term common name.
		//
		if(item.hasOwnProperty('common_name')) {
			term._info._description = {
				iso_639_3_eng: item['common_name']
			}
		}

		//
		// Handle ISO data.
		//
		term.iso_639_alpha3 = item['alpha_3']
		if(item.hasOwnProperty('alpha_2')) {
			term.iso_639_alpha2 = item['alpha_2']
		}
		if(item.hasOwnProperty('bibliographic')) {
			term.iso_639_bibliographic = item['bibliographic']
		}
		if(item.hasOwnProperty('common_name')) {
			term.iso_639_common = {
				iso_639_3_eng: item['common_name']
			}
		}

		//
		// Create enumeration edge.
		//
		kGlob.globals.res.edges.push({
			_from: gid,
			_to: nid,
			_predicate: '_predicate_enum-of',
			_path: [nid]
		})

	} // No ISO 639-3 counterpart.

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

} // CreateIso639_2()

/**
 * Fill term and edge buffers with ISO 639-3 objects.
 * @param {object} item - ISO 639-3 object.
 */
function CreateIso639_3(item) {

	//
	// Init local storage.
	//
	const nid = "iso_639_3"
	const lid = item['alpha_3']
	const gid = nid + kGlob.globals.token.ns + lid

	//
	// Init variables.
	//
	let edge = {}
	let codes = []

	//
	// Load term codes list and decoding tables.
	//
	Array("alpha_2", "alpha_3", "bibliographic").forEach( (key) => {
		if(item.hasOwnProperty(key)) {
			codes.push(item[key])
		}
	})

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: codes,
		},
		_info: {
			_title: {iso_639_3_eng: item['name']}
		}
	}

	//
	// Add inverted name.
	//
	if(item.hasOwnProperty('inverted_name')) {
		term._info._definition = {iso_639_3_eng: item['inverted_name']}
	}

	//
	// Add common name.
	//
	if(item.hasOwnProperty('common_name')) {
		term._info._description = {iso_639_3_eng: item['common_name']}
	}

	//
	// Handle language scope and type.
	//
	term.iso_639_scope = 'iso_639_scope' + kGlob.globals.token.ns + item['scope']
	term.iso_639_type = 'iso_639_type' + kGlob.globals.token.ns + item['type']

	//
	// Handle ISO codes.
	//
	term.iso_639_alpha3 = item['alpha_3']
	// Add code to ISO 639-3 codes list.
	kGlob.globals.dec.iso_639_3_codes.add(item['alpha_3'])

	if(item.hasOwnProperty('alpha_2')) {
		term.iso_639_alpha2 = item['alpha_2']
		// Add code to 2 to 3 decoding table.
		kGlob.globals.dec.iso_639_1_to_3[item['alpha_2']] = item['alpha_3']
	}

	if(item.hasOwnProperty('bibliographic')) {
		term.iso_639_bibliographic = item['bibliographic']
	}

	//
	// Handle ISO names.
	//
	if(item.hasOwnProperty('common_name')) {
		term.iso_639_common = {iso_639_3_eng: item['common_name']}
	}
	if(item.hasOwnProperty('inverted_name')) {
		term.iso_639_inverted = {iso_639_3_eng: item['inverted_name']}
	}

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

	//
	// Create and add ISO edge to buffer.
	//
	// kGlob.globals.res.edges.push({
	// 	_from: gid,
	// 	_to: nid,
	// 	_predicate: '_predicate_enum-of',
	// 	_path: ['iso']
	// })
	//
	// MILKO - Disabled to remove ISO path.

	//
	// Create and add scope edge to buffer.
	//
	if((item['scope'] === 'M') || (item['scope'] === 'S')) {
		edge = {
			_from: gid,
			_to: term.iso_639_scope,
			_predicate: '_predicate_enum-of',
			_path: ['iso_639_3']
		}
		kGlob.globals.res.edges.push(edge)
	}

	//
	// Create, process and add type edge to buffer.
	//
	if(item['scope'] === 'I') {
		edge = {
			_from: gid,
			_to: term['iso_639_type'],
			_predicate: '_predicate_enum-of',
			_path: ['iso_639_3']
		}
		kGlob.globals.res.edges.push(edge)
	}

} // CreateIso639_3()

/**
 * Fill term and edge buffers with ISO 639-5 objects.
 * Some elements will be bridged to their ISO 639-3 or ISO 639-2 counterpart.
  * @param {object} item - ISO 639-5 object.
 */
function CreateIso639_5(item) {

	//
	// Init local storage.
	//
	const nid = "iso_639_5"
	const lid = item['alpha_3']
	const gid = nid + kGlob.globals.token.ns + lid

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: [lid]
		}
	}

	//
	// Handle reference to ISO 639-2 term.
	//
	if(kGlob.globals.dec.iso_639_2_codes.has(lid)) {

		//
		// Create bridge edge.
		//
		kGlob.globals.res.edges.push({
			_from: gid,
			_to: nid,
			_predicate: '_predicate_bridge-of',
			_path: [nid]
		})

		//
		// Create enumeration edge.
		//
		kGlob.globals.res.edges.push({
			_from: 'iso_639_2' + kGlob.globals.token.ns + lid,
			_to: gid,
			_predicate: '_predicate_enum-of',
			_path: [nid]
		})

	} // Bridged to ISO 639-2 term.

	//
	// Handle reference to ISO 639-3 term.
	//
	else if(kGlob.globals.dec.iso_639_3_codes.has(lid)) {

		//
		// Create bridge edge.
		//
		kGlob.globals.res.edges.push({
			_from: gid,
			_to: nid,
			_predicate: '_predicate_bridge-of',
			_path: [nid]
		})

		//
		// Create enumeration edge.
		//
		kGlob.globals.res.edges.push({
			_from: 'iso_639_3' + kGlob.globals.token.ns + lid,
			_to: gid,
			_predicate: '_predicate_enum-of',
			_path: [nid]
		})

	} // Bridged to ISO 639-3 term.

	//
	// Update term and create edge.
	//
	else {

		//
		// Save ISP 639-5 native code for later.
		//
		kGlob.globals.dec.iso_639_5_codes.add(lid)

		//
		// Set term name.
		//
		if(!term.hasOwnProperty('_info')) {
			term._info = {}
		}
		term._info._title = {
			iso_639_3_eng: item['name']
		}

		//
		// Handle ISO data.
		//
		term.iso_639_alpha3 = item['alpha_3']

		//
		// Create enumeration edge.
		//
		kGlob.globals.res.edges.push({
			_from: gid,
			_to: nid,
			_predicate: '_predicate_enum-of',
			_path: [nid]
		})

	} // No ISO 639-3 counterpart.

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

} // CreateIso639_5()

/**
 * Fill term and edge buffers with ISO 4217 objects.
 * @param {object} item - ISO 4217 object.
 */
function CreateIso4217(item) {

	//
	// Init local storage.
	//
	const nid = "iso_4217"
	const lid = item['alpha_3']
	const gid = nid + kGlob.globals.token.ns + lid

	//
	// Init variables.
	//
	let codes = []

	//
	// Load term codes list and decoding tables.
	//
	Array("alpha_3", "numeric").forEach( (key) => {
		if(item.hasOwnProperty(key)) {
			codes.push(item[key])
		}
	})

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: codes
		},
		_info: {
			_title: {iso_639_3_eng: item['name']}
		}
	}

	//
	// Handle ISO codes.
	//
	term.iso_4217_alpha3 = item['alpha_3']
	if(item.hasOwnProperty('numeric')) {
		term.iso_4217_numeric = item['numeric']
	}

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

	//
	// Add code to decoding tables.
	//
	kGlob.globals.dec.iso_4217_codes.add(lid)

	//
	// Create and add ISO edge to buffer.
	//
	kGlob.globals.res.edges.push({
		_from: gid,
		_to: nid,
		_predicate: '_predicate_enum-of',
		_path: [nid]
	})

} // CreateIso4217()

/**
 * Fill term and edge buffers with ISO 15924 objects.
 * @param {object} item - ISO 15924 object.
 */
function CreateIso15924(item) {

	//
	// Init local storage.
	//
	const nid = "iso_15924"
	const lid = item['alpha_4']
	const gid = nid + kGlob.globals.token.ns + lid

/*
	//
	// Init variables.
	//
	let codes = []

	//
	// Load term codes list and decoding tables.
	//
	Array("alpha_4", "numeric").forEach( (key) => {
		if(item.hasOwnProperty(key)) {
			codes.push(item[key])
		}
	})
*/

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: [item['alpha_4'], item['numeric']],
		},
		_info: {
			_title: {iso_639_3_eng: item['name']}
		}
	}

	//
	// Handle ISO codes.
	//
	term.iso_15924_alpha4 = item['alpha_4']
	term.iso_15924_numeric = item['numeric']

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

	//
	// Create and add ISO edge to buffer.
	//
	kGlob.globals.res.edges.push({
		_from: gid,
		_to: nid,
		_predicate: '_predicate_enum-of',
		_path: [nid]
	})

} // CreateIso15924()

/**
 * Fill term and edge buffers with ISO 3166-1 objects.
 * @param {object} item - ISO 3166-1 object.
 */
function CreateIso3166_1(item) {

	//
	// Init local storage.
	//
	const nid = "iso_3166_1"
	const lid = item['alpha_3']
	const gid = nid + kGlob.globals.token.ns + lid

	//
	// Init variables.
	//
	let codes = []

	//
	// Load term codes list and decoding tables.
	//
	Array("alpha_2", "alpha_3", "numeric").forEach( (key) => {
		if(item.hasOwnProperty(key)) {
			codes.push(item[key])
		}
	})

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: codes,
		},
		_info: {
			_title: {iso_639_3_eng: item['name']}
		}
	}

	//
	// Add official name.
	//
	if(item.hasOwnProperty('official_name')) {
		term._info._definition = {iso_639_3_eng: item['official_name']}
	}

	//
	// Add common name.
	//
	if(item.hasOwnProperty('common_name')) {
		term._description = {iso_639_3_eng: item['common_name']}
	}

	//
	// Handle ISO codes.
	//
	term.iso_3166_alpha3 = item['alpha_3']

	if(item.hasOwnProperty('alpha_2')) {
		term.iso_3166_alpha2 = item['alpha_2']

		//
		// Add codes to decoding table.
		//
		kGlob.globals.dec.iso_3166_A2_to_A3[item['alpha_2']] = lid
	}

	if(item.hasOwnProperty('numeric')) {
		term.iso_3166_numeric = item['numeric']
	}

	if(item.hasOwnProperty('flag')) {
		term.std_country_emoji = item['flag']
	}

	//
	// Handle ISO names.
	//
	if(item.hasOwnProperty('official_name')) {
		term['iso_3166_official-name'] = {iso_639_3_eng: item['official_name']}
	}

	if(item.hasOwnProperty('common_name')) {
		term['iso_3166_common-name'] = {iso_639_3_eng: item['common_name']}
	}

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

	//
	// instantiate edge.
	//
	var edge = {
		_from: gid,
		_to: nid,
		_predicate: '_predicate_enum-of',
		_path: [nid]
	}

	//
	// Handle EUFGIS country.
	//
	if(kGlob.globals.eufgis.countries.has(lid)) {
		edge._path.push("eufgis_countries")
	}

	//
	// Add to buffer.
	//
	kGlob.globals.res.edges.push(edge)

} // CreateIso3166_1()

/**
 * Fill term buffers with ISO 3166-2 objects.
 * The function will create the subdivision terms and subdiivision type terms.
 * Only subdivisions that link to a valid country will be considered.
 * @param {object} item - ISO 3166-2 object.
 */
function CreateIso3166_2_terms(item) {

	//
	// Init local storage.
	//
	const nid = "iso_3166_2"
	const lid = item['code']
	const gid = nid + kGlob.globals.token.ns + lid
	const country2 = item['code'].slice(0, 2)

	//
	// Check if country code is valid.
	//
	if(! kGlob.globals.dec.iso_3166_A2_to_A3.hasOwnProperty(country2)) {
		throw Error(`ISO-3166-2 code references unknown country [${country2}]`)
	}

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: [lid],
		},
		_info: {
			_title: {iso_639_3_eng: item['name']}
		}
	}

	//
	// Add type.
	//
	if(item.hasOwnProperty('type') && (item['type'].length > 0)) {

		//
		// Set type info.
		//
		const tnid = "iso_3166_2_type"
		const tlid = ProcessCountrySubdivisionType(item['type'])
		const tgid = tnid + kGlob.globals.token.ns + tlid

		//
		// Update subdivision term.
		//
		term.iso_3166_2_type = tgid

		//
		// Create subdivision term type.
		//
		if(! kGlob.globals.res.types.hasOwnProperty(tgid)) {

			//
			// Add new term.
			//
			kGlob.globals.res.types[tgid] = {
				_code: {
					_nid: tnid,
					_lid: tlid,
					_gid: tgid,
					_aid: [tlid],
				},
				_info: {
					_title: {iso_639_3_eng: item['type']}
				}
			}

		} // New subdivision type.

	} // Has subdivision type.

	//
	// Add terms to buffer.
	//
	kGlob.globals.res.terms[lid] = term

} // CreateIso3166_2_terms()

/**
 * Fill edge buffers with ISO 3166-2 objects.
 * The function will iterate all buffered subdivision terms and create the necessary edges.
 * @param {[object]} items - List of original subdivisions.
 */
function CreateIso3166_2_edges(items) {

	//
	// Init local storage.
	//
	let dict = new Set()
	let countries = new Set()

	//
	// Iterate original objects.
	//
	items.forEach( (item) => {

		//
		// Check if buffered.
		//
		if(kGlob.globals.res.terms.hasOwnProperty(item['code'])) {

			//
			// Init local storage.
			//\
			const code = item['code'].slice(0, 2)
			const term = kGlob.globals.res.terms[item['code']]

			//
			// Connect subdivision to its type
			// for path 'iso' and 'enum' predicate.
			//
			// kGlob.globals.res.edges.push({
			// 	_from: term._code._gid,
			// 	_to: term.iso_3166_2_type,
			// 	_predicate: '_predicate_enum-of',
			// 	_path: ['iso']
			// })
			//
			// MILKO - Removed, because not clear what it achieves.

			//
			// Handle connection to other subdivision.
			//
			if(item.hasOwnProperty('parent') && (item['parent'].length > 0)) {

				//
				// Check parent.
				//
				const plid = code + '-' + item['parent']
				if(kGlob.globals.res.terms.hasOwnProperty(plid)) {

					//
					// Get parent.
					//
					const parent = kGlob.globals.res.terms[plid]

					//
					// Connect subdivision to its parent
					// for path 'iso_3166_2' and 'enum' predicate.
					//
					kGlob.globals.res.edges.push({
						_from: term._code._gid,
						_to: parent._code._gid,
						_predicate: '_predicate_enum-of',
						_path: [term._code._nid]
					})

					//
					// Connect subdivision to its parent in topos
					// for path 'iso_3166' and subdivision type predicate.
					//
					kGlob.globals.res.topos.push({
						_from: term._code._gid,
						_to: parent._code._gid,
						_predicate: term.iso_3166_2_type,
						_path: ['iso_3166']
					})

					//
					// Connect subdivision types
					// for path 'iso_3166_2_type' and 'enum' predicate.
					//
					const hash = term.iso_3166_2_type + ',' + parent.iso_3166_2_type
					if(! dict.has(hash)) {

						dict.add(hash)

						kGlob.globals.res.edges.push({
							_from: term.iso_3166_2_type,
							_to: parent.iso_3166_2_type,
							_predicate: '_predicate_enum-of',
							_path: ['iso_3166_2_type']
						})

					} // Was not already added

				} // Parent was buffered.

			} // Has parent.

			//
			// Handle connection to country.
			//
			else {

				//
				// Get country.
				// We check this when we add terms.
				//
				const country = 'iso_3166_1'
					+ kGlob.globals.token.ns
					+ kGlob.globals.dec.iso_3166_A2_to_A3[code]

				//
				// Connect subdivision to its parent
				// for path 'iso_3166_2' and 'enum' predicate.
				//
				kGlob.globals.res.edges.push({
					_from: term._code._gid,
					_to: country,
					_predicate: '_predicate_enum-of',
					_path: [term._code._nid]
				})

				//
				// Connect subdivision to its parent in topos
				// for path 'iso_3166' and subdivision type predicate.
				//
				kGlob.globals.res.topos.push({
					_from: term._code._gid,
					_to: country,
					_predicate: term.iso_3166_2_type,
					_path: ['iso_3166']
				})

				//
				// Connect subdivision types
				// for path 'iso_3166_2_type' and 'enum' predicate.
				//
				const hash = term.iso_3166_2_type + ',' + 'iso_3166_2_type'
				if(! dict.has(hash)) {

					dict.add(hash)

					kGlob.globals.res.edges.push({
						_from: term.iso_3166_2_type,
						_to: 'iso_3166_2_type',
						_predicate: '_predicate_enum-of',
						_path: ['iso_3166_2_type']
					})

				} // Was not already added

				//
				// Connect country to enumeration root.
				//
				if(! countries.has(country)) {

					countries.add(country)

					kGlob.globals.res.edges.push({
						_from: country,
						_to: term._code._nid,
						_predicate: '_predicate_section-of',
						_path: [term._code._nid]
					})

				} // Country not yet connected.

			} // Has not a parent.

		} // Was buffered.

	})	// Iterating subdivisions.

} // CreateIso3166_2_edges()

/**
 * Fill term and edge buffers with ISO 3166-3 objects.
 * @param {object} item - ISO 3166-3 object.
 */
function CreateIso3166_3(item) {

	//
	// Init local storage.
	//
	const nid = "iso_3166_3"
	const lid = item['alpha_4']
	const gid = nid + kGlob.globals.token.ns + lid

	//
	// Init variables.
	//
	let codes = []

	//
	// Load term codes list and decoding tables.
	//
	Array("alpha_2", "alpha_3", "alpha_4", "numeric").forEach( (key) => {
		if(item.hasOwnProperty(key)) {
			codes.push(item[key])
		}
	})

	//
	// Init new term.
	//
	let term = {
		_code: {
			_nid: nid,
			_lid: lid,
			_gid: gid,
			_aid: codes,
		},
		_info: {
			_title: {iso_639_3_eng: item['name']}
		}
	}

	//
	// Handle comment.
	//
	if(item.hasOwnProperty('comment')) {
		term._info._notes = {iso_639_3_eng: item['comment']}
	}

	//
	// Add codes.
	//
	term.iso_3166_alpha2 = item['alpha_2']
	term.iso_3166_alpha3 = item['alpha_3']
	term.iso_3166_3_alpha4 = item['alpha_4']
	if(item.hasOwnProperty('numeric')) {
		term.iso_3166_numeric = item['numeric']
	}

	//
	// Handle withdrawal date.
	//
	if(item.hasOwnProperty('withdrawal_date')) {
		term.iso_3166_3_withdrawal = item['withdrawal_date']
	}

	//
	// Add term to buffer.
	//
	kGlob.globals.res.terms[lid] = term

	//
	// Create ISO-3166-3 edge.
	//
	kGlob.globals.res.edges.push({
		_from: gid,
		_to: nid,
		_predicate: '_predicate_enum-of',
		_path: [nid]
	})

} // CreateIso3166_3()

/**
 * Load translations for ISO 639-2 languages from iso-codes PO files.
 * @param {string} key - ISO 639-5 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 639-3 code for translation language.
 */
function TranslateIso639_2(key, names, translation) {

	//
	// Handle only non bridged terms.
	//
	if(kGlob.globals.dec.iso_639_2_codes.has(key)) {

		//
		// Handle name.
		//
		if(names.hasOwnProperty('Name')) {
			kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
		}

		//
		// Handle common name.
		//
		if(names.hasOwnProperty('Common name')) {
			kGlob.globals.res.terms[key]['_info']['_description'][translation] = names['Common name']
			kGlob.globals.res.terms[key]['iso_639_common'][translation] = names['Common name']
		}

	} // Non bridged term.

} // TranslateIso639_2()

/**
 * Load translations for ISO 639-3 languages from iso-codes PO files.
 * @param {string} key - ISO 639-3 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 639-3 code for translation language.
 */
function TranslateIso639_3(key, names, translation) {

	//
	// Handle name.
	//
	if(names.hasOwnProperty('Name')) {
		kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
	}

	//
	// Handle common name.
	//
	if(names.hasOwnProperty('Common name')) {
		kGlob.globals.res.terms[key]['_info']['_description'][translation] = names['Common name']
		kGlob.globals.res.terms[key]['iso_639_common'][translation] = names['Common name']
	}

	//
	// Handle inverted name.
	//
	if(names.hasOwnProperty('Inverted name')) {
		kGlob.globals.res.terms[key]['_info']['_definition'][translation] = names['Inverted name']
		kGlob.globals.res.terms[key]['iso_639_inverted'][translation] = names['Inverted name']
	}

} // TranslateIso639_3()

/**
 * Load translations for ISO 639-5 languages from iso-codes PO files.
 * @param {string} key - ISO 639-5 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 639-3 code for translation language.
 */
function TranslateIso639_5(key, names, translation) {

	//
	// Handle only ISO 639-5 specific entries.
	//
	if(kGlob.globals.dec.iso_639_5_codes.has(key)) {

		//
		// Handle name.
		//
		if(names.hasOwnProperty('Name')) {
			kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
		}

	} // Not a bridged term.

} // TranslateIso639_5()

/**
 * Load translations for ISO 4217 currencies from iso-codes PO files.
 * @param {string} key - ISO 4217 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 639-3 code for translation language.
 */
function TranslateIso4217(key, names, translation) {

	//
	// Handle name.
	//
	if(names.hasOwnProperty('Name')) {
		kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
	}

} // TranslateIso4217()

/**
 * Load translations for ISO 15924 currencies from iso-codes PO files.
 * @param {string} key - ISO 15924 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 639-3 code for translation language.
 */
function TranslateIso15924(key, names, translation) {

	//
	// Handle name.
	//
	if(names.hasOwnProperty('Name')) {
		kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
	}

} // TranslateIso15924()

/**
 * Load translations for ISO 3166-1 countries from iso-codes PO files.
 * @param {string} key - ISO 3166-1 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 3166-1 code for translation language.
 */
function TranslateIso3166_1(key, names, translation) {

	//
	// Handle name.
	//
	if(names.hasOwnProperty('Name')) {
		kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
	}

	//
	// Handle official name.
	//
	if(names.hasOwnProperty('Official name')) {
		if(!kGlob.globals.res.terms[key]['_info'].hasOwnProperty('_definition')) {
			kGlob.globals.res.terms[key]['_info']['_definition'] = {}
		}
		kGlob.globals.res.terms[key]['_info']['_definition'][translation] = names['Official name']
		kGlob.globals.res.terms[key]['iso_3166_official-name'][translation] = names['Official name']
	}

	//
	// Handle common name.
	//
	if(names.hasOwnProperty('Common name')) {
		if(!kGlob.globals.res.terms[key]['_info'].hasOwnProperty('_description')) {
			kGlob.globals.res.terms[key]['_info']['_description'] = {}
		}
		kGlob.globals.res.terms[key]['_info']['_description'][translation] = names['Common name']
		kGlob.globals.res.terms[key]['iso_3166_common-name'][translation] = names['Common name']
	}

} // TranslateIso3166_1()

/**
 * Load translations for ISO 3166-2 subdivisions from iso-codes PO files.
 * @param {string} key - ISO 3166-2 term keys.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 3166-1 code for translation language.
 */
function TranslateIso3166_2(key, names, translation) {

	//
	// Handle name.
	//
	if(names.hasOwnProperty('Name')) {
		kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
	}

	//
	// Handle official name.
	//
	if(names.hasOwnProperty('Official name')) {
		kGlob.globals.res.terms[key]['_info']['_definition'][translation] = names['Official name']
		kGlob.globals.res.terms[key]['iso_3166_official-name'][translation] = names['Official name']
	}

	//
	// Handle common name.
	//
	if(names.hasOwnProperty('Common name')) {
		kGlob.globals.res.terms[key]['_info']['_description'][translation] = names['Common name']
		kGlob.globals.res.terms[key]['iso_3166_common-name'][translation] = names['Common name']
	}

} // TranslateIso3166_2()

/**
 * Load translations for ISO 3166-3 countries from iso-codes PO files.
 * @param {string} key - ISO 3166-3 term key.
 * @param {object} names - { <name type> : <translated name> }
 * @param {string} translation - ISO 3166-3 code for translation language.
 */
function TranslateIso3166_3(key, names, translation) {

	//
	// Handle name.
	//
	if(names.hasOwnProperty('Name')) {
		kGlob.globals.res.terms[key]['_info']['_title'][translation] = names['Name']
	}

} // TranslateIso3166_3()

/**
 * Process term files.
 * @param {Database} db - Database connection.
 * @param {string} colname - Database collection name.
 * @param {object} files - { file base name : file path }
 * @param {callback} callback - Callback processing function: either ProcessTerm or ProcessEdge.
 * @returns {Promise<void>}
 */
async function ProcessFiles(db, colname, files, callback) {

	//
	// Set collection reference.
	//
	const collection = db.collection(colname)

	//
	// Iterate items.
	//
	for(const [name, path] of Object.entries(files)) {

		//
		// Try block.
		//
		try {

			//
			// Process original records.
			//
			console.log(`==> Processing ${path}`)
			const records = JSON.parse(
				fs.readFileSync(path, 'utf8')
			).map(callback)

			//
			// Write to file.
			//
			if(kPriv.user.flag.write_file) {

				//
				// Set destination file path.
				//
				const destination = pt.join(kGlob.globals.path.processed, name + '.json')

				//
				// Write to file.
				//
				console.log(`==> Writing to file ${destination}`)
				fs.writeFileSync(destination, JSON.stringify(records), 'utf8')

			} // Write to file.

			//
			// Write to database.
			//
			console.log(`==> Inserting ${name}`)
			await collection.import(records)

		} catch (err) {
			console.error(err)
		}

	} // Iterating items.

} // ProcessFiles()

/**
 * Process list of terms or edges.
 * @param {Database} db - Database connection.
 * @param {string} colname - Database collection name.
 * @param {Array} items - List of terms or edges.
 * @param {callback} callback - Callback processing function: either ProcessTerm or ProcessEdge.
 * @param {string} filename - Eventual filename to write processed file in.
 * @returns {Promise<void>}
 */
async function ProcessItems(db, colname, items, callback, filename) {

	//
	// Continue if there are items.
	//
	if(items.length > 0) {

		//
		// Set local storage.
		//
		const records = items.map(callback)
		const collection = db.collection(colname)

		//
		// Write to file.
		//
		if(kPriv.user.flag.write_file) {

			//
			// Set destination file path.
			//
			const destination = pt.join(kGlob.globals.path.processed, filename + '.json')

			//
			// Write to file.
			//
			console.log(`  ??? Processing ${filename}`)
			fs.writeFileSync(destination, JSON.stringify(records), 'utf8')

		} // Write to file.

		//
		// Write to database.
		//
		console.log(`  ??? Inserting ${filename}`)
		await collection.import(records)

	} // Have items to process.

} // ProcessItems()

/**
 * Process term identifier.
 * The function expects a term, it will compute its global identifier
 * according to its namespace and local identrifier,
 * set its global identifier and return the value.
 * The function also throws an exception if either the global or local identifiers are missing.
 * @param {object} term - Term to process.
 * @returns {string|*} - Global identifier ot error.
 */
function ProcessIdentifier(term) {

	//
	// Check global and local identifiers.
	//
	if(term?._code?._gid === undefined) {
		throw( Error( `Missing global identifier in term [${term._code._lid}]` ) )	// ==>
	}

	//
	// Check local identifier.
	//
	if(term?._code?._lid === undefined) {
		throw(Error(`Missing local identifier in term [${term._code._gid}]`))		// ==>
	}

	//
	// Init identifier.
	//
	let identifier = ""

	//
	// Handle namespace.
	//
	if(term?._code?._nid !== undefined) {

		//
		// Handle user namespace.
		//
		if(term._code._nid.length > 0) {
			identifier = term._code._nid
		}

	} // Has namespace.

	//
	// Is namespace.
	//
	else {

		term._code._gid = term._code._lid
		return term._code._lid 														// ==>

	} // Is namespace.

	//
	// Handle local identifier.
	//
	term._code._gid = identifier + kGlob.globals.token.ns + term._code._lid
	return term._code._gid 													// ==>

} // ProcessIdentifier()

/**
 * Load ISO-3166-1 ancillary data.
 * @param {object} item - The (countries) external repository country object.
 */
function ProcessCountryReferences(item) {

	//
	// Set country key.
	//
	const key = item['cca3']
	if(kGlob.globals.res.terms.hasOwnProperty(key)) {

		//
		// Set IOC code.
		//
		if(item.hasOwnProperty('cioc')) {
			kGlob.globals.res.terms[key].std_country_ioc = item['cioc']
		}

		//
		// Set top level domains.
		//
		if(item.hasOwnProperty('tld') && (item['tld'].length > 0)) {
			kGlob.globals.res.terms[key].std_country_tld = item['tld']
		}

		//
		// Set calling codes.
		//
		if(item.hasOwnProperty('callingCodes') && (item['callingCodes'].length > 0)) {
			kGlob.globals.res.terms[key].std_country_tel = item['callingCodes']
		}

		//
		// Set area.
		//
		if(item.hasOwnProperty('area')) {
			kGlob.globals.res.terms[key]['std_country_area'] = item['area']
		}

		//
		// Set languages.
		//
		ProcessCountryLists(
			item,
			key,
			'languages',
			Object.keys(item['languages']),
			kGlob.globals.dec.iso_639_3_codes,
			'iso_639_3',
			'std_country_languages',
			'iso_3166'
		)

		//
		// Set currencies.
		//
		ProcessCountryLists(
			item,
			key,
			'currencies',
			Object.keys(item['currencies']),
			kGlob.globals.dec.iso_4217_codes,
			'iso_4217',
			'std_country_currencies',
			'iso_3166'
		)

		//
		// Set borders.
		//
		ProcessCountryLists(
			item,
			key,
			'borders',
			item['borders'],
			new Set(Object.keys(kGlob.globals.res.terms)),
			'iso_3166_1',
			'std_country_borders',
			'iso_3166'
		)

		//
		// Set region.
		//
		if(item.hasOwnProperty('region') && (item['region'].length > 0)) {
			kGlob.globals.res.terms[key].std_country_region = {'iso_639_3_eng': item['region']}
		}

		//
		// Set subregion.
		//
		if(item.hasOwnProperty('subregion') && (item['subregion'].length > 0)) {
			kGlob.globals.res.terms[key]['std_country_sub-region'] = {'iso_639_3_eng': item['subregion']}
		}

	} else {
		console.log(`    !!! Unknown country [${key}]`)
	}

} // ProcessCountryReferences()

/**
 * Process country property lists, such as languages, currencies and borders
 * @param item
 * @param key
 * @param property
 * @param {Array} codes
 * @param {Set} references
 * @param namespace
 * @param descriptor
 * @param path
 */
function ProcessCountryLists(item, key, property, codes, references, namespace, descriptor, path) {

	//
	// Check property.
	//
	if(item.hasOwnProperty(property)) {

		//
		// Select existing properties.
		//
		const list = codes.filter( (code) => {
			return references.has(code)
		})

		//
		// Handle remaining properties.
		//
		if(list.length > 0) {

			//
			// Process properties.
			//
			kGlob.globals.res.terms[key][descriptor] = []
			list.forEach( (code) => {

				//
				// Add to list.
				//
				const gid = namespace + kGlob.globals.token.ns + code
				kGlob.globals.res.terms[key][descriptor].push(gid)

				//
				// Add topo.
				//
				kGlob.globals.res.topos.push({
					_from: gid,
					_to: kGlob.globals.res.terms[key]._code._gid,
					_predicate: descriptor,
					_path: [path]
				})

			}) // Iterating properties

		} // Has at least one property.

	} // Has properties.

} // ProcessCountryLists()

/**
 * Process provided term.
 * This function will create the _key property of the term according to the user settings:
 * it will either set the _key to the MD5 of the global identifier,
 * or it will set the _key to the global identifier substituting slashes with colons.
 * The function will also ensure that global and local identifiers exist in the term.
 * @param {object} term - Original term, with _key set.
 */
function ProcessTerm(term) {

	//
	// Compose global identifier.
	//
	const gid = ProcessIdentifier(term)

	//
	// Init new term with _key.
	//
	let newTerm = {
		"_key": ProcessGlobalIdentifier(gid)
	}

	//
	// Load existing properties.
	//
	for(const key in term) {

		//
		// Skip _key.
		//
		if(key === '_key') {
			continue
		}

		newTerm[key] = term[key]
	}

	return newTerm																	// ==>

} // ProcessTerm()

/**
 * Process provided edge.
 * - This function will create the _key property of the edge according to the user settings:
 * it will join _from, predicate and _to separating them with a token, the resulting string
 * will be MD5 hashed in the _key; the user settings have no effect here.
 * - The function expects the _from and _to properties to hold the global identifiers of the
 * related terms, the function will take care of converting them to record references according
 * to the settings in user globals.
 * - The function will ensure the edge features the predicate and path fields.
 * @param {object} edge - Original edge, with _key set.
 */
function ProcessEdge(edge) {

	//
	// Assert the edge has its references.
	//
	if('_from' in edge && '_to' in edge) {

		//
		// Check predicate.
		//
		if('_predicate' in edge) {

			//
			// Check path.
			//
			if('_path' in edge) {

				//
				// Set term record references.
				//
				const srcRef = kDb.collection_terms + '/' + ProcessGlobalIdentifier(edge._from)
				const dstRef = kDb.collection_terms + '/' + ProcessGlobalIdentifier(edge._to)

				//
				// Create key string.
				//
				const index = srcRef
							+ kGlob.globals.token.tok
							+ edge._predicate
							+ kGlob.globals.token.tok
							+ dstRef

				//
				// Init new term with _key.
				//
				let newEdge = {
					"_key": md5(index)
				}

				//
				// Load existing properties.
				//
				for(const key in edge) {

					//
					// Parse property.
					//
					switch(key) {

						case '_from':
							newEdge._from = srcRef
							break

						case '_to':
							newEdge._to = dstRef
							break

						case '_key':
							break

						default:
							newEdge[key] = edge[key]
							break;
					}

				} // Loaded processed properties.

				return newEdge															// ==>

			} else {
				throw(Error(`Missing path in edge`))
			}

		} else {
			throw(Error(`Missing predicate in edge`))
		}

	} else {
		throw(Error(`Missing _from or _to in edge`))
	}

} // ProcessEdge()

/**
 * Process global identifier.
 * This function will either return the MD5 of the global identifier,
 * or the global identifier with slashes converted to colons depending on the value of the settings flag:
 * - MD5: Hash to md5.
 * - GID: Use global identifier.
 * @param {string} identifier - Global identifier.
 * @returns {string} - _key value
 */
function ProcessGlobalIdentifier(identifier) {
	return (identifier.length > 0) ? identifier : ':'								// ==>

	//
	// Parse settings.
	//
	// switch(kPriv.user.flag.key_encode)
	// {
	// 	case 'MD5':
	// 		return md5(identifier)													// ==>
	//
	// 	case 'GID':
	// 		return (identifier.length > 0) ? identifier : ':'						// ==>
	//
	// 	default:
	// 		throw(Error(`Invalid user globals key_encode flag value, found [${kPriv.user.flag}]`))
	// }

} // ProcessGlobalIdentifier()

/**
 * Process country subdivision type.
 * This function will take an ISO 3166-2 country subdivision type name
 * and return a normalised value fit to be used as an identifier.
 * @param {string} name - Country subdivision name.
 * @returns {string} - _key value
 */
function ProcessCountrySubdivisionType(name) {

	//
	// Check if not empty.
	//
	if(name.length > 0) {

		//
		// Init local storage.
		//
		let processed = name.toLowerCase()

		//
		// Split on comma.
		//
		const parts = processed.split(',')
		if(parts.length > 1) {
			processed = parts[0]
		}

		//
		// Replace spaces with dashes.
		//
		processed = processed.replace(/ /g, "-")

		return processed															// ==>

	} // Npt empty.

	return name																		// ==>

} // ProcessCountrySubdivisionType()

/**
 * Return a dictionary of file name and file paths.
 * @param {string} directory - Directory to scan.
 * @param {string }extension - Selected files extension, e.g. .json.
 * @param {[string]} prefix - Select files with that prefix.
 * @param {number} length - Number of characters for the base name, 0 means ignore.
 * @returns {object} - { file base name : file path }
 */
function GetFilesList(directory, extension = '', prefix = [], length = 0) {

	//
	// Read directory.
	//
	const files = fs.readdirSync(directory)

	//
	// Filter files.
	//
	const list = {}
	files.filter( (file) => {

		//
		// Get base name.
		//
		const basename = file.slice(0, pt.extname(file).length * -1)

		//
		// Filter extension.
		//
		if(	extension.length > 0 &&
			pt.extname(file).toLowerCase() !== extension.toLowerCase() ) {
			return false														// =>
		}

		//
		// Filter name length.
		//
		if(length > 0) {
			if(basename.length !== length) {
				return false													// ==>
			}
		}

		//
		// Filter prefix.
		//
		if(prefix.length > 0) {
			for(item of prefix) {
				if(file.toLowerCase().startsWith(item.toLowerCase())) {
					return true														// =>
				}
			}
		} else {
			return true
		}

		return false

	}).forEach( (file) => {
		list[file.slice(0, pt.extname(file).length * -1)] = pt.join(directory, file)
	})

	return list																		// ==>

} // GetFilesList()

/**
 * Load translations from corresponding (iso-codes) PO files directory.
 * @param {string} directory - PO files directory name (not path).
 * @param {string} blockRegex - Regular expression to parse codes.
 * @param {string} nameRegex - Regular expression to parse names.
 * @param {callback} callback - Callback for loading translations.
 */
function TranslateIso(directory, blockRegex, nameRegex, callback) {

	//
	// Constant helpers.
	//
	const token = kGlob.globals.token.ns
	const decoders = kGlob.globals.dec

	//
	// Get files list.
	//
	const files = GetFilesList(
		pt.resolve(pt.join(kGlob.globals.path.iso_po, directory)),
		'.po',
		[],
		2
	)

	//
	// Iterate found files.
	//
	for(const [language, file] of Object.entries(files)) {

		//
		// Check translation code.
		//
		if(! decoders.iso_639_1_to_3.hasOwnProperty(language)) {
			console.log(`    !!! Unmatched language code [${language}]`)
			continue
		}

		//
		// Skip dubious language translations.
		//
		if(kGlob.globals.skip_languages.includes(decoders.iso_639_1_to_3[language])) {
			continue
		}

		//
		// Get translation code.
		//
		const translation = 'iso_639_3'
			+ token
			+ decoders.iso_639_1_to_3[language]

		//
		// Add localised names.
		//
		for(const [key, names] of Object.entries(ParseIsoPoFile(file, blockRegex, nameRegex))) {
			callback(key, names, translation)
		}

	} // Iterating files.

} // TranslateIso()

/**
 * Parse ISO PO file.
 * @param {string} fileName - File path.
 * @param {string} blockRegex - Regular expression to parse codes.
 * @param {string} nameRegex - Regular expression to parse names.
 * @returns {object} - { language code: { name type: name translation } }
 */
function ParseIsoPoFile(fileName,blockRegex, nameRegex) {

	//
	// Init local storage.
	//
	let result = {}		// { <code>: { <name type>: <name> } }
	let code = null		// Language code.
	let type = null		// Name type.
	let match = null	// Reguler expression match.
	let matches = []	// List of matching codes.
	let matched = 0		// Number of selection blocks in regex.

	//
	// Read PO file.
	//
	const contents = fs.readFileSync(fileName, 'utf-8');

	//
	// Scan file.
	//
	contents.split(/\r?\n/).forEach(line =>  {

		//
		// Match block start.
		// [1]: Name type
		// [2]: Alpha-3 language code.
		//
		match = line.match(blockRegex)
		if(match !== null) {

			//
			// Handle number of selection blocks in regex.
			// 1 means #. (<pattern1>) for <pattern2>
			// 2 means pattern as #. Name for <code>, Name for <code>
			//
			matched = match.length

			//
			// Single name type and code.
			//
			if(matched === 3) {

				//
				// Set elements.
				//
				type = match[1]
				code = match[2]

				//
				// Init language record.
				//
				if(! result.hasOwnProperty(code)) {
					result[code] = {}
				}

			} // One name type and one code.

			//
			// Single name type and multiple codes.
			//
			else {

				//
				// Parse codes.
				//
				matches = match[1].split(', ').map( (pat) => {
					return pat.slice(9)
				})

				//
				// Init result record.
				//
				matches.forEach( (code) => {
					if(! result.hasOwnProperty(code)) {
						result[code] = {}
					}
				})

			} // One name and many codes.

		} // Matched block.

		//
		// Match name.
		//
		match = line.match(nameRegex)
		if(match !== null) {

			//
			// Handle single name type and one code.
			//
			if((matched === 3) && (code !== null)) {

				//
				// Set corresponding name.
				//
				result[code][type] = match[1]

			} // Single code.

			//
			// Handle single name type and many codes.
			//
			else if(matches.length > 0) {

				//
				// Set corresponding names.
				//
				for(const code of matches) {
					result[code]['Name'] = match[1]
				}

			} // Multiple codes.

		} // Matched name.

	});

	return result																	// ==>

} // ParseIsoPoFile()

module.exports = {
	ProcessDictionaryFiles, ProcessIsoStandards,
	ValidateTerms, ValidateEdges, ValidateTopos
}