/**
 * User globals.
 *
 * This structure contains user dependent and defined globals.
 * - **host**: Provide the database host and port.
 * - **name**: Provide the database name.
 * - **user**: Provide the database user name.
 * - **pass**: Provide the database user password.
 * - **mount**: Provide the Foxx service mount path; the actual collection names
 * 				use this name as a prefix and the following names separated by
 * 				an underscore: `<mount>_<terms_col>` would be the terms collection name.
 * - **terms_col**: Terms collection name suffix, *see mount*.
 * - **edges_col**: Schemas collection name suffix, *see mount*.
 * - **topos_col**: Toponyms collection name suffix, *see mount*.
 * - **error_col**: Errors collection name suffix, *see mount*.
 * - **write_file**: Flag determining whether files will be written to the processed directory.
 */

const fs = require('fs');
const user = JSON.parse(fs.readFileSync('dbCredentials.skobo.json'))

module.exports = { user }
