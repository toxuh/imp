import type { Step } from '../types';
import { exec } from '../services/shell.service';
import fs from 'node:fs/promises';
import path from 'node:path';

export const stepNpmInstall: Step = {
  name: 'npm install',
  run: async ({ cwd }) => {
    await fs.rm(path.join(cwd, 'yarn.lock'), { force: true });
    await exec('npm', ['install'], cwd);
  },
};

