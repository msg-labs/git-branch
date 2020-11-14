const chalk = require( 'chalk' );
const renderCandidate = require( './render-candidate.js' );

describe( 'render-candidate', () => {

    it( 'adds the selected flag to the first branch', () => {

        expect.assertions( 1 );

        const line = renderCandidate( { name: 'test' }, 0 );

        expect( line.slice( 0, 2 ) ).toStrictEqual( '> ' );

    } );

    it( 'adds the active flag to the active branch', () => {


        expect.assertions( 1 );

        const line = renderCandidate( {
            active: true,
            name: 'test'
        }, 1 );

        expect( line.slice( 0, 2 ) ).toStrictEqual( '* ' );

    } );

    it( 'prioritizes the selected flag over others', () => {

        expect.assertions( 1 );

        const line = renderCandidate( {
            active: true,
            name: 'test'
        }, 0 );

        expect( line.slice( 0, 2 ) ).toStrictEqual( '> ' );

    } );

    it( 'adds whitespaces to any non flagged branch', () => {

        expect.assertions( 1 );

        const line = renderCandidate( { name: 'test' }, 2 );

        expect( line.slice( 0, 2 ) ).toStrictEqual( '  ' );

    } );

    it( 'doesn\'t colorize the output if there is no search', () => {

        expect.assertions( 1 );

        const line = renderCandidate( { name: 'test' }, 1 );
        const mock = `  ${ chalk.gray( 'test' ) }`;

        expect( line ).toStrictEqual( mock );

    } );

    it( 'highlights the matching portion of the branch name', () => {

        expect.assertions( 1 );

        const line = renderCandidate( { name: 'test' }, 1, [], 'st' );
        const mock = `  ${ chalk.gray( `te${ chalk.inverse( 'st' ) }` ) }`;

        expect( line ).toStrictEqual( mock );

    } );

    it( 'displays dates if the data is available on the candiate', () => {

        expect.assertions( 1 );

        const line = renderCandidate( {
            lastUpdate: '5 hours',
            name: 'test'
        }, 1, [], '' );
        const mock = `  ${ chalk.gray( 'test' ) } 5 hours`;

        expect( line ).toStrictEqual( mock );
    } );

} );
