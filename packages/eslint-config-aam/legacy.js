 /* global module, require */
module.exports = {
    extends: [
        './rules/best-practices',
        './rules/errors',
        './rules/style',
        './rules/variables',
    ].map(require.resolve),
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        browser: true,
    },
    rules: {
        'no-restricted-properties': 'warn',
    },
};
