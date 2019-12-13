const sortBranches = branches => branches
    .sort( ( a, b ) => a.name < b.name );

const filterBranches = ( input, branches ) => branches
    .filter( ( { name } ) => name
        .toLowerCase()
        .includes( input ) );

const deleteStart = 0;
const deleteEnd = -1;


const branchSearch = ( branches, input = '' ) => ( {

    add ( val ) {
        this.searchInput = `${ this.input }${ val }`;
    },

    get branches () {
        return sortBranches( filterBranches( this.input, branches ) );
    },

    delete () {
        this.searchInput = this.input.slice( deleteStart, deleteEnd );
    },

    get input () {
        return this.searchInput;
    },

    get result () {
        return this.branches.shift();
    },

    searchInput: [ ...input ].join( '' )

} );


module.exports = branchSearch;
