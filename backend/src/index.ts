import { allByUser } from './repositories/book/read';

async function run() {
  const actual = await all();

  console.log(actual);
}

run();