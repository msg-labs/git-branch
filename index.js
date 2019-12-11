#!/usr/bin/env node

// Node
const { red } = require( 'chalk' );

// Application
const checkout = require( './src/git/checkout.js' );
const branchSearch = require( './src/branch-search.js' );
const getBranches = require( './src/git/branch.js' );
const rpl = require( './src/ui/rpl.js' );
const { write } = require( './src/ui/utils.js' );


getBranches()
    .then( branchSearch )
    .then( rpl )
    .then( ( { name } ) => name )
    .then( checkout )
    .then( response => write( `${ response }\n` ) )
    .catch( error => write( red( error ) ) );
