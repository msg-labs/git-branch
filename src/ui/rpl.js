// Node
const process = require( 'process' );
const readLine = require( 'readline' );

// Application
const {
    write,
    escape
} = require( './utils.js' );
const renderCandidates = require( './render-candidates.js' );


const EXIT_CODES = {
    ok: 0
};

const setup = () => {

    readLine.emitKeypressEvents( process.stdin );
    process.stdin.setRawMode( true );
    process.stdin.resume();
    process.stdin.setEncoding( 'utf8' );

    write( 'Branch name > ' );

};

const printCandidates = candidates => {
    escape( 'cursorSavePosition' );
    escape( 'cursorNextLine' );
    escape( 'eraseDown' );
    write( renderCandidates( candidates ) );
    escape( 'cursorRestorePosition' );
};

const onCtrlC = () => {
    write( '\n' );
    escape( 'eraseDown' );
    // eslint-disable-next-line no-process-exit
    process.exit( EXIT_CODES.ok );
};


const onReturn = () => {
    escape( 'cursorPrevLine' );
    write( '\n' );
    escape( 'eraseDown' );
    process.stdin.pause();
};

const onDelete = () => {

    const previousCharacter = 1;

    escape( 'cursorBackward', previousCharacter );
    escape( 'eraseEndLine' );

};

const rpl = search => new Promise( ( resolve, reject ) => {

    setup();

    printCandidates( search.branches );

    process.stdin.on( 'keypress', ( character, key ) => {

        if ( key.sequence === '\u0003' ) {
            onCtrlC();
            return;
        }

        if ( key.name === 'backspace' ) {

            if ( !search.input.length ) {
                return;
            }

            onDelete();
        }

        if ( key.name === 'return' ) {
            onReturn();
            resolve( search.result );
            return;
        }

        write( character );
        search.input = key.name;

        printCandidates( search.branches );

    } );

    process.stdin.on( 'error', reject );

} );


module.exports = rpl;
