/**
 * makeDocs.js
 *
 * Create Markdown documentation files in docs directory.
 * Scan core JSON files and extract documentation to Markdown files.
 */

const fs = require("fs")					// File system functions.

/**
 * Main procedure.
 *
 * @returns {Promise<void>}
 */
async function main()
{
	//
	// Namespaces.
	//
	const namespaceFiles = [
		"namespace.dictionary.json",
		"namespace.geo.json",
		"namespace.iso.json",
		"namespace.std.json",
		"namespace.eufgis.json",
		"namespace.characterisation.json"
	]

	//
	// Descriptors.
	//
	const descriptorFiles = [
		"descriptor.dictionary.code.json",
		"descriptor.dictionary.data.json",
		"descriptor.dictionary.database.json",
		"descriptor.dictionary.edge.json",
		"descriptor.dictionary.info.json",
		"descriptor.dictionary.rule.json",
		"descriptor.geo.json",
		"descriptor.iso.json",
		"descriptor.std.json",
		"descriptor.eufgis.json",
		"descriptor.characterisation.json",
		"descriptor.characterisation.phenotype.json",
		"descriptor.characterisation.genetic.json"
	]

	//
	// Enumerations.
	//
	const enumerationFiles = [
		"enumeration.dictionary.data.json",
		"enumeration.dictionary.edge.json",
		"enumeration.dictionary.unit.json",
		"enumeration.geo.json",
		"enumeration.eufgis.json"
	]

	//
	// Structs.
	//
	const objectFiles = [
		"object.dictionary.json",
		"object.dictionary.rule.json"
	]

	try
	{
		console.log("\n============================")
		console.log("Processing namespace files.")
		console.log("============================")
		await ProcessFiles(namespaceFiles)

		console.log("\n============================")
		console.log("Processing descriptor files.")
		console.log("============================")
		await ProcessFiles(descriptorFiles)

		console.log("\n============================")
		console.log("Processing enumeration files.")
		console.log("============================")
		await ProcessFiles(enumerationFiles)

		console.log("\n============================")
		console.log("Processing struct files.")
		console.log("============================")
		await ProcessFiles(objectFiles)

	} // TRY BLOCK

	catch(error)
	{
		//
		// Display error.
		//
		// console.error(error.message)
		console.log(error)

	} // CATCH BLOCK

} // main()

/**
 * Process files
 * This function will scan the filenames provided in the parameter from the
 * processed directory, for each file it will extract the documentation
 * contained in the _info block and write each element into a Markdown file
 * into the docs directory.
 * @param theList {Array}: List of filenames to process.
 */
async function ProcessFiles(theList)
{
	//
	// Init local storage.
	//
	const srcDir = 'data/processed/'
	const dstDir = 'docs/'

	try
	{
		//
		// Iterate files.
		//
		for(file of theList) {

			//
			// Open file.
			//
			const data = fs.readFileSync(`${srcDir}${file}`, 'utf8')

			//
			// Convert to array.
			//
			const items = JSON.parse(data)

			//
			// Iterate items.
			//
			for(item of items) {

				//
				// Init markdown document data.
				//
				let document = ""

				//
				// Set _key.
				//
				document += `### ${item._key}`

				//
				// Set title.
				//
				document += FormatSection(
					"title",
					`#### ${item._info._title.iso_639_3_eng}`
				)

				//
				// Set definition.
				//
				if(item._info.hasOwnProperty('_definition')) {
					document += FormatSection(
						"definition",
						`###### ${item._info._definition.iso_639_3_eng}`
					)
				}

				//
				// Set description.
				//
				if(item._info.hasOwnProperty('_description')) {
					document += FormatSection(
						"description",
						item._info._description.iso_639_3_eng
					)
				}

				//
				// Set examples.
				//
				if(item._info.hasOwnProperty('_examples')) {
					document += FormatSection(
						"examples",
						item._info._examples.iso_639_3_eng
					)
				}

				//
				// Set notes.
				//
				if(item._info.hasOwnProperty('_notes')) {
					document += FormatSection(
						"notes",
						item._info._notes.iso_639_3_eng
					)
				}

				//
				// Write file.
				//
				const fileName = `${dstDir}${item._key}.md`
				console.log(fileName)
				fs.writeFileSync(fileName, document)
			}
		}

	} // TRY BLOCK

	catch(error)
	{
		//
		// Display error.
		//
		// console.error(error.message)
		console.log(error)

	} // CATCH BLOCK

} // ProcessFiles()

/**
 * FormatSection
 * This function expects the section name and section contents,
 * it will return the section block formatted for Markdown.
 * @param theSection {string}: Section title.
 * @param theContent {string}: Section content in Markdown.
 * @returns {string}: The formatted section block.
 * @constructor
 */
function FormatSection(theSection, theContent)
{
	//
	// Set section header.
	//
	let section = `\n\n\n\n------\n`

	//
	// Set section content.
	//
	section += theContent

	return section 																// ==>

} // FormatSection()

main()
