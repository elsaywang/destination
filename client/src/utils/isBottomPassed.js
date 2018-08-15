export const isBottomPassed = () =>
    Boolean(
        window.innerHeight + Math.ceil(window.pageYOffset + 1) >=
            document.getElementById('root').offsetHeight,
    );
