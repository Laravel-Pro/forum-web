'use strict';

const publisher = require('@pact-foundation/pact-node');
const path = require('path');
const version = require('../package.json').version;

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

require('../config/env');

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: process.env.PACT_BROKER_URL,
  pactBrokerUsername: process.env.PACT_USERNAME,
  pactBrokerPassword: process.env.PACT_PASSWORD,
  consumerVersion: version,
}

publisher.publishPacts(opts)
