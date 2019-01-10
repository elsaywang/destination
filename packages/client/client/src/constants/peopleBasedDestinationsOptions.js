export const peopleBasedDestinationsTypeOptions = [
    { label: `ALL`, value: `ALL` },
    { label: `FACEBOOK`, value: `FB` },
    { label: `GOOGLE`, value: `GOOGL` },
    { label: `LINKEDIN`, value: `LNKD` },
    { label: `TWITTER`, value: `TWTR` },
];

export const getPeopleBasedDestinationsTypeLabel = type => {
    const peopleBasedTypeOption = peopleBasedDestinationsTypeOptions.find(
        ({ label, value }) => value === type,
    );

    return peopleBasedTypeOption ? peopleBasedTypeOption.label : '';
};
