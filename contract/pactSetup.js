const path = require("path")
const Pact = require("@pact-foundation/pact").Pact

global.provider = new Pact({
  port: 8991,
  consumer: 'TodoApp',
  provider: 'TodoService',
  log: path.resolve(process.cwd(), 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
})
