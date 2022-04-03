/**
 * processing.js
 *
 * This file contains functions that process and generate JSON files.
 */

const fs = require("fs")					// File system utilities.
const pt = require("path")					// Directory path helper.
const md5 = require("md5")					// MD5 hash library.
const { Database } = require("arangojs")	// ArangoDB driver.

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.

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
		kPriv.user.db.terms_col,				// Database collection name.
		GetFilesList(
			kGlob.globals.path.base,			// Source data files directory.
			'.json', 					// File extension.
			['terms', 'descriptors']		// Selection name prefixes.
		),
		ProcessTerm 							// Object processing callback.
	)

	//
	// Process edge files.
	//
	await ProcessFiles(
		db,										// Database connection.
		kPriv.user.db.edges_col,				// Database collection name.
		GetFilesList(
			kGlob.globals.path.base,			// Source data files directory.
			'.json', 					// File extension.
			['schemas']					// Selection name prefixes.
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
	await LoadIso639_3(db)

} // ProcessIsoStandards()

/**
 * Load ISO 639-3 standard.
 * @param {Database} db - Database connection.
 * @returns {Promise<void>}
 */
async function LoadIso639_3(db) {
	console.log(`==> Handling ISO 639-3`)

	//
	// Reset buffers.
	//
	kGlob.globals.res.terms = {}
	kGlob.globals.res.edges = []

	//
	// Read objects.
	//
	console.log(`  • Reading objects`)
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
	console.log(`  • Loading buffers`)
	terms.forEach(CreateIso639_3)

	//
	// Load translations.
	//
	console.log(`  • Loading translations`)
	TranslateIso639_3()

	//
	// Write terms.
	//
	await ProcessItems(
		db,
		kPriv.user.db.terms_col,
		Object.values(kGlob.globals.res.terms),
		ProcessTerm,
		'terms.iso.639.3'
	)

	//
	// Write edges.
	//
	await ProcessItems(
		db,
		kPriv.user.db.edges_col,
		kGlob.globals.res.edges,
		ProcessEdge,
		'schemas.iso.639.3'
	)

} // LoadIso639_3()

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
	var edge = {}
	var codes = []

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
	var term = {
		_codes_nid: nid,
		_codes_lid: lid,
		_codes_gid: gid,
		_codes_fid: gid,
		_codes_aid: codes,
		_docs_label: {iso_639_3_eng: item['name']}
	}
	if(item.hasOwnProperty('inverted_name')) {
		term._docs_definition = {iso_639_3_eng: item['inverted_name']}
	}
	if(item.hasOwnProperty('common_name')) {
		term._docs_description = {iso_639_3_eng: item['common_name']}
	}

	//
	// Handle language scope and type.
	//
	term.iso_639_scope = 'iso_639_scopes' + kGlob.globals.token.ns + item['scope']
	term.iso_639_type = 'iso_639_types' + kGlob.globals.token.ns + item['type']

	//
	// Handle ISO codes.
	//
	term.iso_639_alpha3 = item['alpha_3']
	kGlob.globals.dec.iso_639_3_codes.add(item['alpha_3'])

	if(item.hasOwnProperty('alpha_2')) {
		term.iso_639_alpha2 = item['alpha_2']
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
	edge = {
		_from: gid,
		_to: nid,
		_rels_predicate: '_enum_pred_enum-of',
		_rels_path: ['iso']
	}
	kGlob.globals.res.edges.push(edge)

	//
	// Create and add scope edge to buffer.
	//
	edge = {
		_from: gid,
		_to: term.iso_639_scope,
		_rels_predicate: '_enum_pred_enum-of',
		_rels_path: ['iso']
	}
	if((item['scope'] === 'M') || (item['scope'] === 'S')) {
		edge._rels_path.push(nid)
	}
	kGlob.globals.res.edges.push(edge)

	//
	// Create, process and add type edge to buffer.
	//
	edge = {
		_from: gid,
		_to: term['iso_639_type'],
		_rels_predicate: '_enum_pred_enum-of',
		_rels_path: ['iso']
	}
	if(item['scope'] === 'I') {
		edge._rels_path.push(nid)
	}
	kGlob.globals.res.edges.push(edge)

} // CreateIso639_3()

/**
 * Load translations for ISO 639-3 languages from iso-codes PO files.
 */
function TranslateIso639_3() {

	//
	// Constant helpers.
	//
	const token = kGlob.globals.token.ns
	const decoders = kGlob.globals.dec
	const results = kGlob.globals.res

	//
	// Get files list.
	//
	const files = GetFilesList(
		pt.resolve(pt.join(kGlob.globals.path.iso_po, "iso_639-3")),
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
		// Get translation code.
		//
		const translation = 'iso_639_3'
						  + token
						  + decoders.iso_639_1_to_3[language]

		//
		// Add localised names.
		//
		for(const [key, names] of Object.entries(ParseIso639_3PoFile(file))) {

			//
			// Handle name.
			//
			if(names.hasOwnProperty('Name')) {
				results.terms[key]['_docs_label'][translation] = names['Name']
			}

			//
			// Handle common name.
			//
			if(names.hasOwnProperty('Common name')) {
				results.terms[key]['_docs_description'][translation] = names['Common name']
				results.terms[key]['iso_639_common'][translation] = names['Common name']
			}

			//
			// Handle inverted name.
			//
			if(names.hasOwnProperty('Inverted name')) {
				results.terms[key]['_docs_definition'][translation] = names['Inverted name']
				results.terms[key]['iso_639_inverted'][translation] = names['Inverted name']
			}

		} // Iterating translations.

	} // Iterating files.

} // TranslateIso639_3()

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
		// Process original records.
		//
		const records =
			JSON.parse(
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
			console.log(`==> Processing ${destination}`)
			fs.writeFileSync(destination, JSON.stringify(records), 'utf8')

		} // Write to file.

		//
		// Write to database.
		//
		console.log(`==> Inserting ${name}`)
		await collection.import(records)

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
		console.log(`  • Processing ${filename}`)
		fs.writeFileSync(destination, JSON.stringify(records), 'utf8')

	} // Write to file.

	//
	// Write to database.
	//
	console.log(`  • Inserting ${filename}`)
	await collection.import(records)

} // ProcessObjects()

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
	// Check global identifier.
	//
	if('_codes_gid' in term) {

		//
		// Check local identifier.
		//
		if('_codes_lid' in term) {

			//
			// Init new term with _key.
			//
			var newTerm = {
				"_key": ProcessGlobalIdentifier(term._codes_gid)
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

			return newTerm															// ==>

		} else {
			throw(Error(`Missing local identifier in term [${term._codes_gid}]`))
		}

	} else {
		throw(Error(`Missing global identifier in term [${term._codes_lid}]`))
	}

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
		if('_rels_predicate' in edge) {

			//
			// Check path.
			//
			if('_rels_path' in edge) {

				//
				// Create key string.
				//
				const index = edge._from
							+ kGlob.globals.token.tok
							+ edge._rels_predicate
							+ kGlob.globals.token.tok
							+ edge._to

				//
				// Set term record references.
				//
				const srcRef = kPriv.user.db.terms_col + '/' + ProcessGlobalIdentifier(edge._from)
				const dstRef = kPriv.user.db.terms_col + '/' + ProcessGlobalIdentifier(edge._to)

				//
				// Init new term with _key.
				//
				var newEdge = {
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

	//
	// Parse settings.
	//
	switch(kPriv.user.flag.key_encode)
	{
		case 'MD5':
			return md5(identifier)													// ==>

		case 'GID':
			return (identifier.length > 0) ? identifier
										   : ':'									// ==>

		default:
			throw(Error(`Invalid user globals key_encode flag value, found [${kPriv.user.flag}]`))
	}

} // ProcessGlobalIdentifier()

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
 * Parse ISO 639-3 PO file.
 * @param {string} filename - File path.
 * @returns {object} - { language code: { name type: name translation } }
 */
function ParseIso639_3PoFile(filename) {

	//
	// Regular expressions.
	//
	const blockRegex = /^#\. (.+) for ([a-z]{3})$/	// Language block regular expression.
	const nameRegex  = /^msgstr "(.+)"$/			// Translated name.

	//
	// Init local storage.
	//
	var result = {}		// { <code>: { Name|Common name|Inverted name: <name> } }
	var code = null		// Language code.
	var type = null		// Name type.
	var match = null	// Reguler expression match

	//
	// Read PO file.
	//
	const contents = fs.readFileSync(filename, 'utf-8');

	//
	// Scan file.
	//
	contents.split(/\r?\n/).forEach(line =>  {

		//
		// Match block start.
		// [1]: 'Name', 'Inverted name', 'Common name'
		// [2]: Alpha-3 language code.
		//
		match = line.match(blockRegex)
		if(match !== null) {

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

		} // Matched block.

		//
		// Match name.
		//
		match = line.match(nameRegex)
		if((match !== null) && (code !== null)) {

			//
			// Set corresponding name.
			//
			result[code][type] = match[1]

		} // Matched name.

	});

	return result

} // ParseIso639_3PoFile()

module.exports = { ProcessDictionaryFiles, ProcessIsoStandards }