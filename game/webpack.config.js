const path = require('path');

module.exports = {
  entry: [
      './src/index.js',
      './platform game/run.js'
],
  output: {
    filename: 'bundle .js',
    path: path.resolve(__dirname, 'dist')
  }
};
