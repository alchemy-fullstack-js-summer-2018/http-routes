const { join } = require('path');
require('dotenv').config({ path:join(__dirname, '.env.test') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('app level', () => {

    it('', () => {

    });
});