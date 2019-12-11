// Node.js
const { promisify } = require( 'util' );
const exec = promisify( require( 'child_process' ).exec );

// Application
const parser = require( './branch-parser.js' );


const COMMAND = 'git branch';

const options = {
    cwd: process.cwd(),
    encoding: 'utf8'
};

const NOT_GIT_REPO = 'not a git repository';

const exceptionHandler = error => {

    if ( error.stderr.includes( NOT_GIT_REPO ) ) {
        throw new Error( 'not a git repository (or any of the parent directories): .git\n' );
    }

    throw error;

};

module.exports = exceptionHandler;


/**
 * Executes git branch on the current directory returning a list of branches
 * @returns {Promise<String>} Promise containing the result of git branch
 */
const branch = () => exec( COMMAND, options )
    .then( ( {
        stdout,
        stderr
    } ) => {
        if ( stderr !== '' ) {
            throw new Error( stderr );
        }
        return stdout;
    } )
    .then( parser )
    .catch( exceptionHandler );

module.exports = branch;
