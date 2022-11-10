/**
 * db.globals.js
 *
 * Contains database globals that are computed at runtime.
 */

const kPriv = require( "./user.globals" );

//
// Collection names.
//
// const collection_terms = kPriv.user.db.mount + '_' + kPriv.user.db.terms_col
// const collection_edges = kPriv.user.db.mount + '_' + kPriv.user.db.edges_col
// const collection_topos = kPriv.user.db.mount + '_' + kPriv.user.db.topos_col

const collection_terms = kPriv.user.db.terms_col
const collection_edges = kPriv.user.db.edges_col
const collection_topos = kPriv.user.db.topos_col

const collection_char = kPriv.user.db.char_col

const collection_errors = kPriv.user.db.error_col

module.exports = {
	collection_terms,
	collection_edges,
	collection_topos,
	collection_char,
	collection_errors
}
