import prompts from 'prompts';
import { run } from './index';

const main = async () => {
  const { withPrisma } = await prompts({
    type: 'toggle',
    name: 'withPrisma',
    message: 'with prisma?',
    initial: false,
    active: 'yes',
    inactive: 'no',
  });

  await run({ withPrisma });
};

main().catch((e) => {
  console.error('[create-imp] failed:', e);
  process.exit(1);
});
