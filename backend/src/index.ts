import { specific } from './repositories/user/read';

async function run() {
  await specific({ id: '' });
}

run();
