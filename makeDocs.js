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
	// Determine files to scan.
	//
	const descriptorFiles = [
		"descriptor.dictionary.code.json",
		"descriptor.dictionary.data.json",
		"descriptor.dictionary.database.json",
		"descriptor.dictionary.edge.json",
		"descriptor.dictionary.info.json",
		"descriptor.dictionary.rule.json"
	]
	const objectFiles = [
		"object.dictionary.json",
		"object.dictionary.rule.json"
	]

	try
	{
		console.log("\n============================")
		console.log("Processing descriptor files.")
		console.log("============================")
		await ProcessFiles(descriptorFiles)

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
				document += "\n\n" + "------\n\n"
				document += `#### ${item._info._title.iso_639_3_eng}`

				//
				// Set definition.
				//
				if(item._info.hasOwnProperty('_definition')) {
					document += "\n\n" + "------\n\n"
					document += `###### ${item._info._definition.iso_639_3_eng}`
				}

				//
				// Set description.
				//
				if(item._info.hasOwnProperty('_description')) {
					document += "\n\n" + "------\n\n"
					document += item._info._description.iso_639_3_eng
				}

				//
				// Set examples.
				//
				if(item._info.hasOwnProperty('_examples')) {
					document += "\n\n" + "------\n\n"
					document += item._info._examples.iso_639_3_eng
				}

				//
				// Set notes.
				//
				if(item._info.hasOwnProperty('_notes')) {
					document += "\n" + "------\n\n"
					document += item._info._notes.iso_639_3_eng
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

main()
