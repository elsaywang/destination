const faker = require('faker');

export const generateItems = () => {
    let data = [];
    const platforms = ['Facebook', 'Google', 'LinkedIn', 'Twitter'];
    const categories = ['Adobe Experience Cloud', 'Integrated Platforms', 'Custom'];
    const types = [`People-Based`, `Device-Based`];
    for (let i = 0; i < 20; i++) {
        data.push({
            id: i,
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
    return data;
};
export const mockItems = generateItems();
