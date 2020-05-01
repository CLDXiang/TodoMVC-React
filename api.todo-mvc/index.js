require('@babel/register')({
  presets: ['@babel/env'],
  plugins: ['@babel/plugin-transform-runtime'],
});

module.exports = require('./app.js');
