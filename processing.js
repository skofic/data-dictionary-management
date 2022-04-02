/**
 * processing.js
 *
 * This file contains functions that process and generate JSON files.
 */

const fs = require("fs")					// File system utilities.
const pt = require("path")					// Directory path helper.
const md5 = require("md5")					// MD5 hash library.

const kGlob = require('./globals')			// Generic globals.
const kPriv = require('./user.globals')		// User-provided globals.

/**
 * Process base files.
 *
 * The function will process all JSON files contained in the base data directory.
 * These files have been filled by hand and they constitute the core of the data dictionary.
 */
function ProcessDictionaryFiles() {

	//
	// Iterate directory.
	//
	const files = GetFilesList(kGlob.globals.path.base, '.json', ['terms', 'descriptors'])

} // ProcessDictionaryFiles()

function ProcessTermFile(filename) {

}

/**
 * Return a dictionary of file name and file paths.
 * @param {string} directory - Directory to scan.
 * @param {string }extension - Selected files extension, e.g. .json.
 * @param {[string]} prefix - Select files with that prefix.
 * @returns {object} - { file base name : file path }
 */
function GetFilesList(directory, extension = '', prefix = []) {

	//
	// Read directory.
	//
	const files = fs.readdirSync(directory)

	//
	// Filter files.
	//
	const list = files.filter( (file) => {

		//
		// Filter extension.
		//
		if(	extension.length > 0 &&
			pt.extname(file).toLowerCase() !== extension.toLowerCase() ) {
			return false														// =>
		}

		//
		// Filter prefix.
		//
		for(item of prefix) {
			if(file.toLowerCase().startsWith(item.toLowerCase())) {
				return true													// =>
			}
		}

		return false

	}).map( (file) => {
		return file
	})

	console.log(list)

	return list																	// ==>

} // GetFilesList()

module.exports = { ProcessDictionaryFiles }