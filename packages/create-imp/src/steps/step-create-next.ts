import type { Step } from '../types';
import { exec } from '../services/shell.service';

const useFlag = (pm: string): string => {
  switch (pm) {
    case 'npm':
      return '--use-npm';
    case 'yarn':
      return '--use-yarn';
    case 'pnpm':
      return '--use-pnpm';
    case 'bun':
      return '--use-bun';
    default:
      return '--use-npm';
  }
};

export const stepCreateNext: Step = {
  name: '', // hidden step: don't show in logs
  run: async ({ cwd, packageManager }) => {
    await exec(
      'npx',
      [
        'create-next-app@latest',
        '.',
        '--ts',
        '--eslint',
        '--tailwind',
        '--app',
        '--import-alias',
        '@/*',
        useFlag(packageManager),
        '--skip-install',
        '--yes',
      ],
      cwd,
    );
  },
};
