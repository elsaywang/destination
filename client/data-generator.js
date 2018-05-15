var faker = require('faker');
var moment = require('moment');
var sortingTypes = [
    'Key Value Pairs',
    'Key Name',
    'Value Name',
    'Signal Type',
    'Signal Source',
    'Total Counts',
    'Total Event Fires',
    'Percentage Change',
    'Included In Traits',
];
var categoryTypes = ['REAL-TIME', 'ONBOARDED'];
var operators = [
    { label: '==', value: '==' },
    { label: '>', value: '>' },
    { label: '<', value: '<' },
    { label: '>=', value: '>=' },
    { label: '<=', value: '<=' },
    { label: 'contains', value: 'contains' },
];
var signalTypes = ['ALL', 'ANALYTICS', 'ALF', 'REALTIME', 'ONBOARDED'];

module.exports = () => {
    const data = {
        savedSearch: [],
        list: {},
        traits: [],
        keys: [],
        reportSuites: [],
        reportSuitesKeys: [],
    };

    const randomGenerateArray = (item, max = 5) => {
        const array = [];

        for (let i = 0; i < Math.floor(Math.random() * max + 1); i++) {
            array.push(new item());
        }

        return array;
    };

    const generateSearchDates = () => {
        const isCustom = Math.random() >= 0.5;
        const customEndDateDaysAgo = Math.floor(Math.random() * 15);
        const customStartDateDaysAgo = customEndDateDaysAgo * 2;
        const viewRecordsFor = isCustom ? 'custom' : '7D';
        const customStartDate = isCustom
            ? moment
                  .utc()
                  .subtract(customStartDateDaysAgo, 'days')
                  .format('YYYY-MM-DD')
            : moment
                  .utc()
                  .subtract(7, 'days')
                  .format('YYYY-MM-DD');
        const customEndDate = isCustom
            ? moment
                  .utc()
                  .subtract(customEndDateDaysAgo, 'days')
                  .format('YYYY-MM-DD')
            : moment.utc().format('YYYY-MM-DD');

        return {
            viewRecordsFor,
            customStartDate,
            customEndDate,
        };
    };

    class ReportSuite {
        constructor() {
            this.name = 'Test Suite ' + faker.random.word();
            this.suite = 'test-suite-' + faker.random.word();
            this.datacenter = 'sin';
            this.pid = 1194;
            this.dataSourceId = faker.random.number();
        }
    }

    class Kvp {
        constructor() {
            const operator = operators[Math.floor(Math.random() * operators.length)].value;

            this.key = 'k-' + faker.random.word();
            this.operator = operator;
            this.value = operator === '==' ? 'v-' + faker.random.word() : faker.random.number();
        }
    }

    class Trait {
        constructor(id) {
            this.id = id;
        }
    }

    class SavedSearch {
        constructor(id) {
            const { viewRecordsFor, customStartDate, customEndDate } = generateSearchDates();

            this.id = id;
            this.keyValuePairs = randomGenerateArray(Kvp, 2);
            this.source = new Source(faker.random.word());
            this.minEventFires = faker.random.number();
            this.signalStatus = 'USED';
            this.viewRecordsFor = viewRecordsFor;
            this.customStartDate = customStartDate;
            this.customEndDate = customEndDate;
            this.sortBy = sortingTypes[Math.floor(Math.random() * sortingTypes.length)];
            this.categoryType = categoryTypes[Math.floor(Math.random() * sortingTypes.length)];
            this.advanced = faker.random.boolean();
        }
    }

    class Source {
        constructor(name, dataSourceIds, reportSuiteIds, sourceType) {
            this.name = name || undefined;
            this.dataSourceIds = dataSourceIds || [faker.random.number()];
            this.reportSuiteIds = reportSuiteIds || null;
            this.sourceType = signalTypes[Math.floor(Math.random() * signalTypes.length)];
        }
    }

    const mockResults = {
        list: [
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                keyName: faker.random.word(),
                valueName: faker.random.word(),
                source: new Source(),
                totalEventFires: faker.random.number(),
                totalCounts: faker.random.number(),
                percentageChange: 0.154,
                includedInTraits: [1, 2, 3],
                signalStatus: 'USED',
            },
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                keyName: faker.random.word(),
                valueName: faker.random.word(),
                source: new Source(),
                totalEventFires: faker.random.number(),
                totalCounts: faker.random.number(),
                percentageChange: -0.3711,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                keyName: faker.random.word(),
                valueName: faker.random.word(),
                source: new Source(1234, null, 'ONBOARDED'),
                totalEventFires: faker.random.number(),
                totalCounts: faker.random.number(),
                percentageChange: -0.9711,
                includedInTraits: [131, 838],
                signalStatus: 'USED',
            },
            {
                keyValuePairs: randomGenerateArray(Kvp, 2),
                keyName: faker.random.word(),
                valueName: faker.random.word(),
                source: new Source(null, 5678, 'ANALYTICS'),
                totalCounts: faker.random.number(),
                totalEventFires: faker.random.number(),
                percentageChange: 0.8711,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
        ],
        page: 0,
        pageSize: 0,
        total: 4,
    };

    data.reportSuitesKeys = {
        reportSuiteId: 169626,
        keys: [
            {
                id: 'eVar1',
                name: 'Product Page',
            },
            {
                id: 'eVar2',
                name: 'Product Page',
            },
            {
                id: 'eVar3',
                name: 'Shopping Cart',
            },
            {
                id: 'eVar4',
                name: 'Membership',
            },
            {
                id: 'eVar5',
                name: 'Shopping Cart',
            },
            {
                id: 'eVar6',
                name: 'Membership',
            },
            {
                id: 'eVar7',
                name: 'test-7',
            },
            {
                id: 'eVar8',
                name: 'test-8',
            },
        ],
    };

    // Create 5 saved search
    for (let i = 0; i < 5; i++) {
        data.savedSearch.push({
            name: faker.name.findName(),
            ...new SavedSearch(i),
        });
    }

    // Create 20 keys and datasources
    for (let i = 0; i < 20; i++) {
        data.keys.push('k-' + faker.name.findName());
        data.reportSuites.push({
            ...new ReportSuite(),
        });
    }

    // Create 100 traits
    for (let i = 0; i < 100; i++) {
        data.traits.push({
            ...new Trait(i),
        });
    }

    data.list = mockResults;

    return data;
};
