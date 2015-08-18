module.exports = {
    browserify: {
        defaultConfig: {
            debug: true
        },
        external: ['angular', 'lodash']
    },
    files: require('./files')
};
