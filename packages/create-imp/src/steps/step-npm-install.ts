import type { Step } from '../types';
import { removeOtherLockfiles } from '../services/pm.service';
import { exec } from '../services/shell.service';

export const stepNpmInstall: Step = {
  name: 'install dependencies',
  run: async ({ cwd }) => {
    await removeOtherLockfiles('npm', cwd);
    await exec('npm', ['install'], cwd);
  },
};
