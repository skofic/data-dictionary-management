/**
 * db.globals.js
 *
 * Contains database globals that are computed at runtime.
 */

const kPriv = require( "./user.globals" );

//
// Collection names.
//
const collection_terms = kPriv.user.db.mount + '_' + kPriv.user.db.terms_col
const collection_edges = kPriv.user.db.mount + '_' + kPriv.user.db.edges_col
const collection_topos = kPriv.user.db.mount + '_' + kPriv.user.db.topos_col

module.exports = { collection_terms, collection_edges, collection_topos }
