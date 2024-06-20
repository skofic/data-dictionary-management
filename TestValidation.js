/**
 * TestValidation.js
 *
 * Test and develop validation framework.
 */

const { Database } = require("arangojs")			// ArangoDB driver.

const kGlob = require('./globals')				// Generic globals.
const kPriv = require('./user.globals')	// User-provided globals.

const dbutils = require('./database')		// Database utilities.
const Validator = require('./Term')		// Validator.

//
// Connect to local database.
//
const db = new Database(
	{
		url: kPriv.user.db.host,			// Host.
		databaseName: kPriv.user.db.name	// Database name.
	}
)

//
// Connect to certified database.
//
// const db = new Database(
// 	{
// 		url: kPriv.user.db.host,			// Host.
// 		databaseName: kPriv.user.db.name,	// Database name.
// 		agentOptions: {						// Certificate.
// 			ca: Buffer.from(kPriv.user.db.encodedCA, "base64")
// 		}
// 	}
// )

//
// Authenticate.
//
db.useBasicAuth(kPriv.user.db.user, kPriv.user.db.pass);

// Note that ArangoDB Oasis runs deployments in a cluster configuration.
// To achieve the best possible availability, your client application has to handle
// connection failures by retrying operations if needed.
db.version().then(
	version => console.log(version),
	error => console.error(error)
);

///
// Test term.
///
const test_term = {
	"_code": {
		"_nid": "",
		"_lid": "info",
		"_gid": "_info",
		"_aid": ["info"]
	},
	"_info": {
		"_title": {"iso_639_3_eng": "Documentation section"},
		"_definition": {"iso_639_3_eng": "This object groups all properties whose function is to document, explain and comment on terms."},
		"_description": {"iso_639_3_eng": "This property holds a [section](_type_object.md) that *groups* all the fields used to *document* a *term*. All the properties contained in this section are a key/value [dictionaries](_dict.md) in which the *key* is an [enumerated](_type_string_enum.md) [language](iso_639_3) code, and the value is the [text](_type_string.md) representing the [title](_title.md), [definition](_definition.md), [description](_description.md), [examples](_examples.md) and [notes](_notes.md) regarding the *term* in which the *section* is *included*.\n\nThis property is *required* by all term types, there is only *one* case in which it can be *omitted*: if the term is a [controlled vocabulary element](_type_string_enum.md) and there is a [bridge](_predicate_bridge-of.md) relationship to a preferred term, this section can be omitted, since it would contain the same content as the referenced term. This case occurs when the same enumeration has different codes and you want to enforce one specific code version as default.\n\nThis section includes the following properties:\n\n- [Title](_title.md): title, name or label.\n- [Definition](_definition.md): definition or summary description.\n- [Description](_description.md): extensive and thorough description with explanations.\n- [Examples](_examples.md): eventual usage examples.\n- [Notes](_notes.md): notes, comments and additional information."},
		"_examples": {"iso_639_3_eng": "```json\n{\n\t\"_info\": {\n\t\t\"_title\": {\n\t\t\t\"iso_639_3_eng\": \"Elevation\",\n\t\t\t\"iso_639_3_ita\": \"Elevazione\"\n\t\t},\n\t\t\"_definition\": {\n\t\t\t\"iso_639_3_eng\": \"Altitude starting from sea level.\",\n\t\t\t\"iso_639_3_ita\": \"Altitudine a partire dal livello del mare.\"\n\t\t},\n\t\t\"_description\": {\n\t\t\t\"iso_639_3_eng\": \"Used in climatic and geographic datasets.\",\n\t\t\t\"iso_639_3_ita\": \"Utilizzato nei dati climatici e geografici.\"\n\t\t},\n\t\t\"_examples\": {\n\t\t\t\"iso_639_3_eng\": \"0: sea level; 1500: location.\",\n\t\t\t\"iso_639_3_ita\": \"0: livello del mare; 1500: posizione.\"\n\t\t},\n\t\t\"_notes\": {\n\t\t\t\"iso_639_3_eng\": \"Values must be expressed in meters.\",\n\t\t\t\"iso_639_3_ita\": \"I valori devono essere espressi in metri.\"\n\t\t}\n\t}\n}\n```"}
	},
	"_data": {
		"_scalar": {
			"_type": "_type_object",
			"_kind": ["_info"]
		}
	},
	"_rule": {
		"_recommended": {
			"_selection-descriptors_all": [
				"_title",
				"_definition",
				"_description"
			]
		}
	}
}


/**
 * Main procedure.
 *
 * @returns {Promise<void>}
 */
async function main()
{
	try
	{
		const term = new Validator.Term(test_term)
		const status = term.Validate()
		if(status !== false) {
			throw new Error(status)
		}

	} // TRY BLOCK

	catch(error)
	{
		//
		// Display error.
		//
		console.error(error.message)
		// console.log(error)

	} // CATCH BLOCK

} // main()

main()
