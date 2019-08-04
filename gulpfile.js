process.env.NODE_ENV = 'production'
const { build } = require('./scripts/gulpfile')

exports.build = build
