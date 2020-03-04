'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.E2E_TEST = 'true';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const spawn = require('child_process').spawn;

// Ensure environment variables are read.
require('../config/env');

const spawnOptions = {
  detached: false,
  stdio: ['ignore', 'inherit', 'inherit']
};

const devServer = spawn('yarn', ['start'], spawnOptions);

devServer.on('exit', (code, signal) => {
  console.log(`dev server exited with code ${code} and signal ${signal}`);
})

let argv = process.argv.slice(2);

let cypress;

if (
  !process.env.CI &&
  argv.length
) {
  console.log(argv);
  cypress = spawn('yarn', ['cypress', ...argv], spawnOptions);
} else {
  cypress = spawn('yarn', ['cypress', 'run'], spawnOptions);
}

cypress.on('exit', (code, signal) => {
  console.log(`cypress exited with code ${code} and signal ${signal}`);
  if (devServer.exitCode === null) {
    console.log('killing devServer');
    devServer.kill();
  }
  let times = 0;
  setInterval(() => {
    if (devServer.killed || times > 10) {
      process.exit();
    }
    times += 1;
  }, 500);
})
