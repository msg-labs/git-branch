
const escapes = require( 'ansi-escapes' );
const process = require( 'process' );


const write = ( ...args ) => process.stdout.write( ...args );
const escape = ( method, ...args ) => write( args.length ?
    escapes[ method ]( ...args ) :
    escapes[ method ] );


module.exports = {
    escape,
    write
};
