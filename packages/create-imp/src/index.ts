import type { Options } from './types';
import { runSteps } from './steps';

export const run = async (options?: Partial<Options>): Promise<void> => {
  const opts: Options = {
    cwd: process.cwd(),
    withPrisma: Boolean(options?.withPrisma),
    debug: options?.debug ?? false,
  };
  await runSteps(opts);
};
