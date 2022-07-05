#!/usr/bin/env node

// Node
const { red } = require( 'chalk' );

// External
const prompt = require( '@msg-labs/cli-prompt-list' );

// Application
const cli = require( './src/ui/cli.js' );
const checkout = require( './src/git/checkout.js' );
const getBranches = require( './src/git/branch.js' );
const renderCandidate = require( './src/ui/render-candidate.js' );


cli.parse();

const options = cli.opts();

const searchOptions = {
    input: options.search,
    limit: options.limit,
    matchField: ( { name } ) => name,
    sortCandidates: false
};

getBranches( options.sortBy )
    .then( branches => prompt(
        branches,
        'Branch name > ',
        renderCandidate,
        searchOptions
    ) )
    .then( ( { name } ) => name )
    .then( checkout )
    .then( response => process.stdout.write( `${ response }\n` ) )
    .catch( error => process.stdout.write( red( error ) ) );
