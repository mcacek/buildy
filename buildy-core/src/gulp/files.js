var fs = require('fs');

module.exports = {
    modules: {
        dest: 'build',

        // get a flat list of all directory name inside of modules
        names: getModuleNames()
    },
    vendor: {
        paths: [
            'node_modules/lodash/index.js',
            'node_modules/angular/angular.js'
        ],
        bundle: 'buildy-core-vendor.js',
        dest: 'build'
    },
    js: {
        bundle: 'buildy-core.js',
        files: []
    },
    css: {
        bundle: 'buildy-core.css',
        files: []
    }
};

function getModuleNames() {
    var dirs = [];
    var files = fs.readdirSync(__dirname + '/../modules');

    files.forEach(function(dir) {
        dirs.push(dir);
    });

    return files;
}
