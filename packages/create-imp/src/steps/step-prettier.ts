import type { Step } from '../types';
import { exec } from '../services/shell.service';
import path from 'node:path';
import { writeIfChanged } from '../services/fs.service';

export const stepPrettier: Step = {
  name: 'add prettier',
  run: async ({ cwd }) => {
    await exec('npm', ['install', '-D', 'prettier', 'prettier-plugin-tailwindcss'], cwd);

    const prettierrc = JSON.stringify(
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        plugins: ['prettier-plugin-tailwindcss'],
      },
      null,
      2,
    );
    const prettierignore = ['node_modules', '.next', 'dist'].join('\n') + '\n';

    await writeIfChanged(path.join(cwd, '.prettierrc'), prettierrc + '\n');
    await writeIfChanged(path.join(cwd, '.prettierignore'), prettierignore);
  },
};
