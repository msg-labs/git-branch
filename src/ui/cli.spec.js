
describe( 'cli', () => {

    let cli = null;

    describe( '[search...]', () => {

        beforeEach( () => {
            cli = require( './cli.js' );
        } );

        afterEach( () => {
            jest.resetModules();
        } );


        it( 'takes an initial string as starting search input', () => {

            expect.assertions( 1 );
            const argv = 'node index some text'.split( ' ' );

            cli.parse( argv );

            expect( cli.search ).toStrictEqual( 'some text' );
        } );

    } );

    describe( '-l', () => {

        beforeEach( () => {
            cli = require( './cli.js' );
        } );

        afterEach( () => {
            jest.resetModules();
        } );


        it( 'takes an option argument to limit the branch line number', () => {

            expect.assertions( 1 );
            const argv = 'node index -l 3'.split( ' ' );

            cli.parse( argv );

            expect( cli.limit ).toStrictEqual( 3 );

        } );

        it( 'has a default value of ten', () => {

            expect.assertions( 1 );
            const argv = 'node index -l'.split( ' ' );

            cli.parse( argv );

            expect( cli.limit ).toStrictEqual( 10 );

        } );

        it( 'has a long version', () => {

            expect.assertions( 1 );
            const argv = 'node index --limit'.split( ' ' );

            cli.parse( argv );

            expect( cli.limit ).toStrictEqual( 10 );

        } );

    } );

} );
