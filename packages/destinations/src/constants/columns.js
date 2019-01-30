import _ from 'lodash';

const allColumnTypes = [
    {
        title: 'ID',
        key: 'destinationId',
        width: 80,
        announce: false,
        sortable: true,
    },
    {
        title: 'CATEGORY',
        key: 'category',
        width: 200,
        active: true,
        sortable: true,
    },
    {
        title: 'TYPE',
        key: 'type',
        width: 150,
        active: true,
        sortable: true,
    },
    {
        title: 'PLATFORM',
        key: 'platform',
        width: 150,
        active: true,
        sortable: true,
    },
    {
        title: 'NAME',
        key: 'name',
        width: 200,
        sortable: true,
    },
    {
        title: 'DESCRIPTION',
        key: 'description',
        minWidth: 250,
        sortable: true,
    },
    {
        title: 'SHAREABLE AUDIENCE',
        key: 'shareableAudience',
        width: 150,
        sortable: true,
    },
    {
        title: 'ADDRESSABLE AUDIENCE (DEVICE)',
        key: 'addressableAudience',
        width: 170,
        sortable: true,
    },
    {
        title: 'MATCH RATE',
        key: 'matchRate',
        width: 120,
        sortable: true,
    },
    {
        title: 'LIFETIME ADDRESSABLE AUDIENCE (DEVICE)',
        key: 'lifetimeAddressableAudience',
        width: 170,
        sortable: true,
    },
    {
        title: 'ACTION',
        key: 'action',
        width: 200,
    },
];

// Declare name of columnTypes to use
const columnsForDestinationType = {
    All: ['ID', 'CATEGORY', 'PLATFORM', 'NAME', 'DESCRIPTION', 'ACTION'],
    'Integrated Platforms': ['ID', 'TYPE', 'PLATFORM', 'NAME', 'DESCRIPTION', 'ACTION'],
    'People-Based': ['ID', 'PLATFORM', 'NAME', 'DESCRIPTION', 'SHAREABLE AUDIENCE', 'ACTION'],
    'Device-Based': [
        'ID',
        'PLATFORM',
        'NAME',
        'DESCRIPTION',
        'ADDRESSABLE AUDIENCE (DEVICE)',
        'MATCH RATE',
        'LIFETIME ADDRESSABLE AUDIENCE (DEVICE)',
        'ACTION',
    ],
    Custom: ['ID', 'TYPE', 'NAME', 'DESCRIPTION', 'ACTION'],
    'Adobe Experience Cloud': ['ID', 'NAME', 'DESCRIPTION', 'ACTION'],
};

const allColumnTypesByTitle = _.keyBy(allColumnTypes, el => el.title);

// column names get matched and replaced with corresponding type
export default _.mapValues(columnsForDestinationType, columnNames => {
    return columnNames.map(name => allColumnTypesByTitle[name]);
});
