const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const faker = require('faker');

server.use(middlewares);

let totalGenerated = 0;

const generateItems = count => {
    let data = [];
    const platforms = ['Facebook', 'Google', 'LinkedIn', 'Twitter'];
    const categories = ['Adobe Experience Cloud', 'Integrated Platforms', 'Custom'];
    const types = [`People-Based`, `Device-Based`];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i + totalGenerated,
            category: categories[Math.floor(Math.random() * categories.length)],
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            type: types[Math.floor(Math.random() * types.length)],
            name: faker.random.word(),
            description: faker.lorem.sentence(),
            shareableAudience: faker.random.number(),
            addressableAudience: faker.random.number(),
            matchRate: `${Math.floor(Math.random() * 100)}%`,
            lifetimeAddressableAudience: faker.random.number(),
            action: '',
        });
    }

    totalGenerated += data.length;
    return data;
};

server.get('/api', (req, res) => {
    const { pageSize, sortBy, descending } = req.query;

    let items = generateItems(pageSize);

    // this is just for mocking, it's obv gross code
    if (sortBy) {
        if (typeof items[0][sortBy] === 'number') {
            items.sort((a, b) => {
                if (descending === 'true') {
                    [b, a] = [a, b];
                }
                return b[sortBy] - a[sortBy];
            });
        } else {
            items.sort((a, b) => {
                if (descending === 'true') {
                    [b, a] = [a, b];
                }
                return a[sortBy].localeCompare(b[sortBy]);
            });
        }
    }

    res.send(items);
});

server.listen(3003, () => {
    console.log('JSON Server is running');
});
