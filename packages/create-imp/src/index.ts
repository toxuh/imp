import type { Options } from './types';
import { runSteps } from './steps';
import prompts from 'prompts';

export const run = async (options?: Partial<Options>): Promise<void> => {
  let withPrisma = options?.withPrisma;

  if (withPrisma === undefined) {
    const res = await prompts({
      type: 'toggle',
      name: 'withPrisma',
      message: 'Do you want to set up Prisma ORM?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    });
    withPrisma = res.withPrisma;
  }

  const opts: Options = {
    cwd: process.cwd(),
    withPrisma: Boolean(withPrisma),
    debug: options?.debug ?? false,
  };
  await runSteps(opts);

  console.clear();
  console.log('IMP was installed. Enjoy.');
};
