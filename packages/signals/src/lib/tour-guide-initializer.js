/*

This file represents all the tour guide steps and will need to be replaced
when product creates the tour guide.

*/

/* eslint-disable */
window.tourGuide = new window.TourGuide({
    currentCoachMarkIndex: 0,
    currentTourIndex: 0,
    infoBoxIsVisible: false, // This shows the tour guide
    moreIsVisble: false,
    tours: [
        {
            title: 'Untitled',
            coachMarks: [
                {
                    targetSelector: '#react-spectrum-3 > span',
                    title: 'Create a Trait Quickly',
                    description: '',
                    anchorPosition: 'bottom',
                    align: 'center',
                    isComplete: true,
                    navButtons: ['back', 'next'],
                },
            ],
        },
    ],
});
