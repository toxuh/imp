import { run } from '@toxuh/create-imp';

const main = async () => {
  await run();
};

main().catch((e) => {
  console.error('[@toxuh/imp] failed:', e);
  process.exit(1);
});
