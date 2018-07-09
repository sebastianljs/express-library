const fs = require('fs');
const mongodbConfigPath = __dirname + '/mongodbConfig.json';
const parsed = JSON.parse(fs.readFileSync(mongodbConfigPath, 'UTF-8'));
exports.options = parsed;