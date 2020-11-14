const statuses = {
    active: flag => flag === '*'
};

const formatBranch = ( [ head, name, lastUpdate ] ) => ( {
    active: statuses.active( head ),
    lastUpdate,
    name
} );

/**
 *
 * Parses the output of a `git branch` command
 *
 * The format of the output is as follows:
 *
 * isActive:name:lastUpdate
 *
 * @param {string} input List of branches using the default git format
 * @returns {Array<String>} List of branches in JS
 */
const parser = input => input
    .split( '\n' )
    .map( line => line.trim() )
    .filter( line => line !== '' )
    .map( line => line.split( ':' ) )
    .map( formatBranch );

module.exports = parser;
