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

const renderLine = ( branch, index, candidates, search ) => {

    const format = getFormat( {
        active: Boolean( branch.active ),
        selected: index === first
    } );

    const branchName = branch.name.replace( search, chalk.inverse( search ) );

    const lastUpdate = branch.lastUpdate ? ` ${ branch.lastUpdate }` : '';

    return `${ format.flag } ${ format.color( branchName ) }${ lastUpdate }`;

};

module.exports = renderLine;

