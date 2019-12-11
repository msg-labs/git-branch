const statuses = {
    active: flag => flag === '*'
};

const formatBranch = elements => ( {
    active: statuses.active( elements.shift() ),
    name: elements.pop()
} );

/**
 *
 * Parses the output of a `git branch` command
 *
 * The format of the output is as follows:
 *
 * [\ |*|+]\ \w*
 *
 * @param {string} input List of branches using the default git format
 * @returns {Array<String>} List of branches in JS
 */
const parser = input => input
    .split( '\n' )
    .filter( line => line !== '' )
    .map( line => line.split( ' ' ) )
    .map( formatBranch );

module.exports = parser;
