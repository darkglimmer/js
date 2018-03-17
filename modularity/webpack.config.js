
const path = require('path');
 module.exports = {
    entry:[
        './js/module2.js',
        './js/module3.js',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}