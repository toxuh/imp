import type { Step } from '../types';
import { exec } from '../services/shell.service';

export const stepCreateNext: Step = {
  name: 'create-next-app',
  run: async ({ cwd }) => {
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
        '--skip-install',
        '--yes',
      ],
      cwd,
    );
  },
};
