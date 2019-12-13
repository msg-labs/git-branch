// Node
const process = require( 'process' );
const readLine = require( 'readline' );

// Application
const {
    write,
    escape,
    getSequence,
    characters
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

const onDelete = search => {
    if ( search.input.length ) {
        const previousCharacter = 1;

        escape( 'cursorBackward', previousCharacter );
        escape( 'eraseEndLine' );

        search.delete();
        printCandidates( search.branches );
    }
};

const rpl = search => new Promise( ( resolve, reject ) => {

    setup();

    printCandidates( search.branches );

    process.stdin.on( 'keypress', ( character, key ) => {

        const sequence = getSequence( key );

        switch ( sequence ) {
            case characters.ESC :
            case characters.CTRLC :
                onCtrlC();
                break;
            case characters.RETURN :
                onReturn();
                resolve( search.result );
                break;
            case characters.BACKSPACE :
                onDelete( search );
                break;
            default :
                write( character );
                search.add( sequence );
                printCandidates( search.branches );
        }

    } );

    process.stdin.on( 'error', reject );

} );


module.exports = rpl;
