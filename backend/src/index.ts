import { all } from './repositories/book/read';

// eslint-disable-next-line no-console
console.log('Hello world');

async function run() {
  const actual = await all();

  console.log(actual);
}

run();
