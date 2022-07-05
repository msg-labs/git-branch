const commander = require( 'commander' );

const {
    version, bin
} = require( '../../package.json' );
const program = new commander.Command();

const DEFAULT_LIMIT = 10;
const DEFAULT_SORT = 'refname';


const limitOption = new commander.Option( '-l, --limit <number>', 'Limits the line output' )
    .argParser( Number.parseInt )
    .default( DEFAULT_LIMIT );

program
    .name( Object.keys( bin )
        .pop() )
    .version( version )
    .arguments( '[search...]' )
    .action( ( search, env ) => {
        env.search = search.join( ' ' );
    } )
    .addOption( limitOption )
    .option( '-s, --sortBy <field>', 'sorts the output', DEFAULT_SORT );


module.exports = program;
