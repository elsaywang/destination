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
        savedSearch: [],
        results: {},
        traits: [],
    };

    const randomGenerateArray = (item, max = 5) => {
        const array = [];

        for (let i = 0; i < Math.floor(Math.random() * max + 1); i++) {
            array.push(new item());
        }

        return array;
    };

    class Kvp {
        constructor() {
            this.signalKey = 'k-' + faker.random.word();
            this.operator = operators[Math.floor(Math.random() * operators.length)].value;
            this.signalValue = 'v-' + faker.random.word();
        }
    }

    class Trait {
        constructor(id) {
            this.id = id;
            this.name = faker.random.words();
            this.value = faker.random.number();
        }
    }

    class Results {
        constructor() {
            this.id = faker.random.number();
            this.keyValuePairs = randomGenerateArray(Kvp, 2);
            this.type = faker.random.word();
            this.source = faker.random.word();
            this.totalCounts = faker.random.number();
            this.percentageChange = faker.random.number();
            this.includedTraits = randomGenerateArray(Trait);
            this.signalStatus = 'USED';
        }
    }

    class Source {
        constructor(dataSourceId, reportSuiteId, sourceType) {
            this.dataSourceId = dataSourceId || faker.random.number();
            this.reportSuiteId = reportSuiteId || null;
            this.sourceType = sourceType || 'REALTIME';
        }
    }

    const mockResults = {
        list: [
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                source: new Source(),
                totalCounts: faker.random.number(),
                percentageChange: 0.154,
                includedInTraits: [1, 2, 3],
                signalStatus: 'USED',
            },
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                source: new Source(),
                totalCounts: faker.random.number(),
                percentageChange: -0.3711,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                source: new Source(1234, null, 'ONBOARDED'),
                totalCounts: faker.random.number(),
                percentageChange: -0.9711,
                includedInTraits: [131, 838],
                signalStatus: 'USED',
            },
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                source: new Source(null, 5678, 'ANALYTICS'),
                totalCounts: faker.random.number(),
                percentageChange: 0.8711,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
        ],
        page: 0,
        pageSize: 0,
        total: 4,
    };

    // Create 5 saved search
    for (let i = 0; i < 5; i++) {
        data.savedSearch.push({
            id: i,
            name: faker.name.findName(),
            ...new Results(),
        });
    }

    // Create 100 traits
    for (let i = 0; i < 100; i++) {
        data.traits.push({
            ...new Trait(i),
        });
        // data.results.push(new Results()); TODO: update fake Results
    }
    data.results = mockResults;

    return data;
};
