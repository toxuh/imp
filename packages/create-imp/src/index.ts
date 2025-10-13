import type { Options, PackageManager } from './types';
import { runSteps } from './steps';
import prompts from 'prompts';

export const run = async (options?: Partial<Options>): Promise<void> => {
  let packageManager = (options?.packageManager as PackageManager | undefined) ?? 'npm';
  let withPrisma = options?.withPrisma;
  let withHttp = options?.withHttp;

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

  if (withHttp === undefined) {
    const res = await prompts({
      type: 'toggle',
      name: 'withHttp',
      message:
        'Include API Toolkit (React Query + Axios + Zod + React Hook Form)?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    });
    withHttp = res.withHttp;
  }

  const opts: Options = {
    cwd: process.cwd(),
    packageManager: packageManager!,
    withPrisma: Boolean(withPrisma),
    withHttp: Boolean(withHttp),
    debug: options?.debug ?? false,
  };
  await runSteps(opts);

  console.clear();
  console.log('IMP was installed. Enjoy.');
};
