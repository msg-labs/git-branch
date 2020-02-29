const commander = require( 'commander' );

const {
    version, bin
} = require( '../../package.json' );
const program = new commander.Command();

const DEFAULT_LIMIT = 10;

program
    .name( Object.keys( bin )
        .pop() )
    .version( version )
    .arguments( '[search...]' )
    .action( ( search, env ) => {
        env.search = search.join( ' ' );
    } )
    .option( '-l, --limit [number]', 'limits the line outputs', Number.parseInt, DEFAULT_LIMIT );


module.exports = program;
