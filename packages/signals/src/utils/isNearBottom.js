const pxAboveBottom = 100;

export const isNearBottom = () =>
    Boolean(
        window.innerHeight + Math.ceil(window.pageYOffset + 1) >=
            document.getElementById('root').offsetHeight - pxAboveBottom,
    );
