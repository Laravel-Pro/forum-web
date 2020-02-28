'use strict';

const publisher = require('@pact-foundation/pact-node')
const path = require('path')

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

require('../config/env');

let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: process.env.PACT_BROKER_URL,
  pactBrokerUsername: process.env.PACT_USERNAME,
  pactBrokerPassword: process.env.PACT_PASSWORD,
  consumerVersion: '2.0.0',
}

publisher.publishPacts(opts)
