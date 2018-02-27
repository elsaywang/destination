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
        results: [],
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

    // Create 100 savedSearches
    for (let i = 0; i < 100; i++) {
        data.savedSearches.push({
            id: i,
            name: faker.name.findName(),
            ...new Results(),
        });
        data.results.push(new Results());
    }

    return data;
};
