/**
 * Term class.
 * This class implements a term.
 */
class Term
{
	///
	// Static type definitions.
	///
	static Type = { kTerm: 0, kDescriptor: 1, kStructure: 3, kDecStructure: 4 }

	///
	// Static error definitions.
	///
	static Errors = {
		kErrMissingSections: 1
	}

	/**
	 * Constructor.
	 * @param theTerm {Object}: The term object.
	 * @param theType {Type}: Term expected type.
	 */
	constructor(theTerm, theType = Term.Type.kTerm)
	{
		// Init class members.
		this.object = theTerm
		this.type = theType

	} // Constructor

	/**************************************************************************/
	/*                                                                        */
	/*                             Public methods.                            */
	/*                                                                        */
	/**************************************************************************/

	Validate()
	{
		///
		// Init storage.
		///
		let status = false

		///
		// Validate term.
		///
		status = this.checkRequiredSections()
		if(status !== false) {
			throw new Error(status)										// ==>
		}

	} // Method Validate()

	/**************************************************************************/
	/*                                                                        */
	/*                            Public functions.                           */
	/*                                                                        */
	/**************************************************************************/

	/**
	 * Check required sections.
	 * This method will ensure all required sections are present.
	 *
	 * @return {String}: Error message or `false`.
	 */
	checkRequiredSections()
	{
		///
		// Perform check.
		///
		const missing_items = this.#CheckMissingSections()
		if(missing_items.size > 0) {
			return `Missing required sections: ${Array.from(missing_items).join(', ')}`
		}

		return false													// ==>

	} // Function CheckRequiredSections()

	/**************************************************************************/
	/*                                                                        */
	/*                           Private functions.                           */
	/*                                                                        */
	/**************************************************************************/

	/**
	 * Check missing required sections
	 * This method will return an array of strings holding the names of the
	 * missing sections.
	 *
	 * @return {Set}: Set of missing structure property names.
	 */
	#CheckMissingSections()
	{
		///
		// Init variables.
		///
		const items = new Set()		// Set of error items.
		const sections = new Set()	// Set of required sections.

		///
		// Set required sections.
		///
		switch(this.type)
		{
			case Term.Type.kTerm:
				['_code', '_info']
					.forEach(item => sections.add(item))
				break

			case Term.Type.kStructure:
				['_code', '_info', '_rule']
					.forEach(item => sections.add(item))
				break

			case Term.Type.kDescriptor:
				['_code', '_info', '_data']
					.forEach(item => sections.add(item))
				break

			case Term.Type.kDecStructure:
				['_code', '_info', '_data', '_rule']
					.forEach(item => sections.add(item))
				break
		}

		///
		// Validate sections.
		///
		sections.forEach(section => {
			if(!this.object.hasOwnProperty(section))
				items.add(section)
		})

		return items													// ==>

	} // Private #CheckMissingSections()

} // Class Term

module.exports = { Term }
