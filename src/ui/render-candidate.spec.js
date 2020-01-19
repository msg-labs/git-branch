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

} );
