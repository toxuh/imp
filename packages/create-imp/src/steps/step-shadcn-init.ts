import type { Step } from '../types';
import { exec } from '../services/shell.service';

export const stepShadcnInit: Step = {
  name: 'shadcn init + next-themes',
  run: async ({ cwd }) => {
    try {
      await exec('npx', ['shadcn@latest', 'init', '-d'], cwd);
    } catch {
      await exec('npx', ['shadcn@canary', 'init', '-d'], cwd);
    }
    await exec('npm', ['install', 'next-themes'], cwd);
  },
};
