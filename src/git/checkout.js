// Node.js
const { promisify } = require( 'util' );
const exec = promisify( require( 'child_process' ).exec );

const errorHandler = error => {

    if ( error.message.includes( 'Switched to branch' ) ) {
        return error.message;
    }

    throw error;

};

const COMMAND = 'git checkout';

const options = {
    cwd: process.cwd(),
    encoding: 'utf8'
};


/**
 * Checks out a branch on the current git repository.
 *
 * @param {String} branchName Branch to be checked out
 * @returns {Promise<String>} Promise containing the result of git checkout
 */
const branch = branchName => exec( `${ COMMAND } ${ branchName }`, options )
    .then( ( {
        stdout,
        stderr
    } ) => {
        if ( stderr.includes( 'Switched to branch' ) ) {
            return `${ stdout }${ stderr }`;
        } else if ( stderr !== '' ) {
            throw new Error( stderr );
        }
        return stdout;
    } )
    .catch( errorHandler );

module.exports = branch;
