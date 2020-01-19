#!/usr/bin/env node

// Node
const { red } = require( 'chalk' );

// External
const prompt = require( '@msg-labs/cli-prompt-list' );

// Application
const checkout = require( './src/git/checkout.js' );
const getBranches = require( './src/git/branch.js' );
const renderCandidate = require( './src/ui/render-candidate.js' );


const initialInputArg = 2;

const searchOptions = {
    input: process.argv[ initialInputArg ] || '',
    matchField: ( { name } ) => name
};

getBranches()
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
