require('dotenv').config({ path: 'src/config/environment/production/.env' });
console.log('environment is ' + process.env.NODE_ENV);
require('../../../index.js');