const parser = require( './branch-parser.js' );


describe( 'branch-parser', () => {

    it( 'removes extra lines from the output', () => {
        expect.assertions( 1 );

        const output = parser( `
            *:master:4 days ago
            :hotifx/test:1 miunte ago
        ` );

        expect( output ).toHaveLength( 2 );

    } );

    it( 'identifies if the branch is active', () => {
        expect.assertions( 1 );

        const output = parser( `
            *:master:4 days ago
            :hotifx/test:1 miunte ago
        ` );

        expect( output ).toContainEqual( expect.objectContaining( {
            active: true,
            name: 'master'
        } ) );

    } );

    it( 'includes the time since the branch was updated for the last time', () => {
        expect.assertions( 1 );

        const output = parser( `
            *:master:4 days ago
            :hotifx/test:1 miunte ago
        ` );

        expect( output ).toContainEqual( expect.objectContaining( {
            lastUpdate: '4 days ago',
            name: 'master'
        } ) );

    } );
} );
