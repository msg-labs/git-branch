// External
const chalk = require( 'chalk' );


const formats = {
    active: {
        color: chalk.green,
        flag: '*'
    },
    default: {
        color: chalk.gray,
        flag: ' '
    },
    selected: {
        color: chalk.blue,
        flag: '>'
    }
};

const getFormat = branch => {

    let format = formats.default;

    if ( branch.active ) {
        format = formats.active;
    }

    if ( branch.selected ) {
        format = formats.selected;
    }

    return format;
};

const first = 0;
const isFirst = index => index === first;

const getStatus = ( branch, index ) => ( {
    active: Boolean( branch.active ),
    selected: isFirst( index )
} );

const addStatues = ( branch, index ) => ( {
    ...branch,
    ...getStatus( branch, index )
} );

const renderLine = branch => {

    const format = getFormat( branch );

    return `${ format.flag } ${ format.color( branch.name ) }`;

};

const generateList = list => list
    .map( addStatues )
    .map( renderLine )
    .join( '\n' );


module.exports = generateList;

