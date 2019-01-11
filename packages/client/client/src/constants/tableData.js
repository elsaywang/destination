const faker = require('faker');
export const columns = [
    {
        title: 'ID',
        key: 'id',
        width: 50,
        announce: false,
        sortable: true,
    },
    {
        title: 'PLATFORM',
        key: 'platform',
        width: 150,
        active: true,
    },
    {
        title: 'NAME',
        key: 'name',
        width: 200,
    },
    {
        title: 'DESCRIPTION',
        key: 'description',
        minWidth: 200,
    },
    {
        title: 'SHAREABLE AUDIENCE',
        key: 'shareableAudience',
        width: 100,
        sortable: true,
    },
    {
        title: 'ACTION',
        key: 'action',
        width: 150,
    },
];

export const generateItems = () => {
    let data = [];
    const platforms = ['Facebook', 'Google', 'LinkedIn', 'Twitter'];
    for (let i = 0; i < 20; i++) {
        data.push({
            id: i,
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            name: faker.random.word(),
            description: faker.lorem.sentence(),
            shareableAudience: faker.random.number(),
            action: '',
        });
    }
    return data;
};
export const mockItems = generateItems();
