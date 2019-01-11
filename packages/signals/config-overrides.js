const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = {
    webpack: function(config, env) {
        config = rewireDefinePlugin(config, env, {
            'process.env.SCALE_MEDIUM': 'true',
            'process.env.SCALE_LARGE': 'false',
            'process.env.THEME_LIGHT': 'true',
            'process.env.THEME_LIGHTEST': 'false',
            'process.env.THEME_DARK': 'false',
            'process.env.THEME_DARKEST': 'false',
        });

        return config;
    },
    // The Jest config to use when running your jest tests - note that the normal rewires do not
    // work here.
    jest: function(config) {
        if (process.env.COBERTURA) {
            config.coverageReporters = ['json', 'lcov', 'text', 'clover', 'cobertura'];
        }

        return config;
    },
};
