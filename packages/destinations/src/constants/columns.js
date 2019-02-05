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
        key: 'destinationType',
        width: 150,
        active: true,
        sortable: true,
    },
    {
        title: 'PLATFORM', //reused by both destinations and authentications list
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
    //authentications list
    {
        title: 'ACCOUNT',
        key: 'account',
        width: 200,
    },
    {
        title: 'AUTHORIZED',
        key: 'authorized',
        width: 200,
    },
    {
        title: 'NOTIFYING',
        key: 'notifying',
        width: 200,
    },
    {
        title: 'EXPIRE IN',
        key: 'expireIn',
        width: 200,
    },
    {
        title: 'ACTIONS', //reused by both destinations and authentications list
        key: 'action',
        width: 200,
    },
];

// Declare name of columnTypes to use
const columnsForDestinationType = {
    All: ['ID', 'CATEGORY', 'PLATFORM', 'NAME', 'DESCRIPTION', 'ACTIONS'],
    'Integrated Platforms': ['ID', 'TYPE', 'PLATFORM', 'NAME', 'DESCRIPTION', 'ACTIONS'],
    'People-Based': ['ID', 'PLATFORM', 'NAME', 'DESCRIPTION', 'SHAREABLE AUDIENCE', 'ACTIONS'],
    'Device-Based': [
        'ID',
        'PLATFORM',
        'NAME',
        'DESCRIPTION',
        'ADDRESSABLE AUDIENCE (DEVICE)',
        'MATCH RATE',
        'LIFETIME ADDRESSABLE AUDIENCE (DEVICE)',
        'ACTIONS',
    ],
    Custom: ['ID', 'TYPE', 'NAME', 'DESCRIPTION', 'ACTIONS'],
    'Adobe Experience Cloud': ['ID', 'NAME', 'DESCRIPTION', 'ACTIONS'],
};

const columnsForIntegratedAccounts = {
    Authentications: ['PLATFORM', 'ACCOUNT', 'AUTHORIZED', 'NOTIFYING', 'EXPIRE IN', 'ACTIONS'],
};

const allColumnTypesByTitle = _.keyBy(allColumnTypes, el => el.title);

// column names get matched and replaced with corresponding type
export const columnsByType = type =>
    _.mapValues(type, columnNames => columnNames.map(name => allColumnTypesByTitle[name]));

export default columnsByType(columnsForDestinationType);

export const columnsForAuthentications = columnsByType(columnsForIntegratedAccounts)
    .Authentications;
