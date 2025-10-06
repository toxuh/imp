import type { Step } from '../types';
import { removeAllInDir } from '../services/fs.service';
import path from 'node:path';

export const stepCleanBoilerplate: Step = {
  name: 'clean boilerplate',
  run: async ({ cwd }) => {
    await removeAllInDir(path.join(cwd, 'public'));
  },
};
