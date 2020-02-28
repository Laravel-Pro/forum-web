import { Pact } from '@pact-foundation/pact';
import path from 'path';

export const provider = new Pact({
  consumer: 'forum-web',
  provider: 'forum-server',
  pactfileWriteMode: 'update',
  log: path.resolve(process.cwd(), 'pact.log'),
  logLevel: 'warn',
  dir: path.resolve(process.cwd(), 'pacts'),
  cors: true,
  spec: 2,
});
