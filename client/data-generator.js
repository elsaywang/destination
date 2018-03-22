var faker = require('faker');
var operators = [
    { label: '=', value: '=' },
    { label: '>', value: '>' },
    { label: '<', value: '<' },
    { label: '>=', value: '>=' },
    { label: '<=', value: '<=' },
    { label: 'contains', value: 'contains' },
];

module.exports = () => {
    const data = {
        savedSearches: [],
        results: {},
    };

    const randomGenerateArray = item => {
        const array = [];

        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            array.push(new item());
        }

        return array;
    };

    class Kvp {
        constructor() {
            this.id = faker.random.number();
            this.key = faker.random.uuid();
            this.operator = operators[Math.floor(Math.random() * operators.length)].value;
            this.value = faker.random.word();
        }
    }

    class Trait {
        constructor() {
            this.id = faker.random.number();
            this.name = faker.random.words();
            this.value = faker.random.number();
        }
    }

    class Results {
        constructor() {
            this.id = faker.random.number();
            this.keyValuePairs = randomGenerateArray(Kvp);
            this.type = faker.random.word();
            this.source = faker.random.word();
            this.total = faker.random.number();
            this.percentageChange = faker.random.number();
            this.includedTraits = randomGenerateArray(Trait);
        }
    }

    const mockResults = {
        list: [
            {
                keyValuePairs: [
                    {
                        signalKey: 'k-alf1',
                        signalValue: 'v-alf1',
                    },
                    {
                        signalKey: 'k-alf2',
                        signalValue: 'v-alf2',
                    },
                ],
                source: {
                    dataSourceId: 1234,
                    reportSuiteId: null,
                    sourceType: 'REALTIME',
                },
                totalCounts: 1234,
                percentageChange: 0.154,
                includedInTraits: [1, 2, 3],
                signalStatus: 'USED',
            },
            {
                keyValuePairs: [
                    {
                        signalKey: 'k-god',
                        signalValue: 'v-god',
                    },
                ],
                source: {
                    dataSourceId: null,
                    reportSuiteId: null,
                    sourceType: 'REALTIME',
                },
                totalCounts: 7592,
                percentageChange: -0.0711,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
            {
                keyValuePairs: [
                    {
                        signalKey: 'k-onb',
                        signalValue: 'v-onb',
                    },
                ],
                source: {
                    dataSourceId: 1234,
                    reportSuiteId: null,
                    sourceType: 'ONBOARDED',
                },
                totalCounts: 7592,
                percentageChange: -0.0711,
                includedInTraits: [131, 838],
                signalStatus: 'USED',
            },
            {
                keyValuePairs: [
                    {
                        signalKey: 'k-an',
                        signalValue: 'v-an',
                    },
                ],
                source: {
                    dataSourceId: null,
                    reportSuiteId: 5678,
                    sourceType: 'ANALYTICS',
                },
                totalCounts: 7592,
                percentageChange: -0.0711,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
        ],
        page: 0,
        pageSize: 0,
        total: 4,
    };

    // Create 100 savedSearches
    for (let i = 0; i < 100; i++) {
        data.savedSearches.push({
            id: i,
            name: faker.name.findName(),
            ...new Results(),
        });
        // data.results.push(new Results()); TODO: update fake Results
    }
    data.results = mockResults;

    return data;
};
