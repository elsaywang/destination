const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = function override(config, env) {
    config = rewireDefinePlugin(config, env, {
        'process.env.SCALE_MEDIUM': 'true',
        'process.env.SCALE_LARGE': 'false',
        'process.env.THEME_LIGHT': 'true',
        'process.env.THEME_LIGHTEST': 'false',
        'process.env.THEME_DARK': 'false',
        'process.env.THEME_DARKEST': 'false',
    });

    return config;
};
