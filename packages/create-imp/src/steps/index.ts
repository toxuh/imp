import type { Options, Step } from '../types';
import { stepCreateNext } from './step-create-next';
import { stepNpmInstall } from './step-npm-install';
import { stepCleanBoilerplate } from './step-clean-boilerplate';
import { stepPrettier } from './step-prettier';
import { stepShadcnInit } from './step-shadcn-init';
import { stepThemeProvider } from './step-theme-provider';
import { stepPrisma } from './step-prisma';
import { stepHttpBundle } from './step-http-bundle';

export const buildSteps = (opts: Readonly<Options>): Step[] => {
  const base: Step[] = [
    stepCreateNext,
    stepNpmInstall,
    stepCleanBoilerplate,
    stepPrettier,
    stepShadcnInit,
    ...(opts.withHttp ? [stepHttpBundle] as Step[] : []),
    stepThemeProvider,
  ];
  return opts.withPrisma ? [...base, stepPrisma] : base;
};

export const runSteps = async (opts: Readonly<Options>): Promise<void> => {
  for (const s of buildSteps(opts)) {
    if (s.name) console.log(`\n— ${s.name}`);
    await s.run(opts);
  }
};
