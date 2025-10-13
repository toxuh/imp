import type { Step } from '../types';
import path from 'node:path';
import { ensureDir, writeIfChanged } from '../services/fs.service';
import { tpl } from '../services/template.service';
import { fileURLToPath } from 'node:url';
import { exec } from '../services/shell.service';

export const stepHttpBundle: Step = {
  name: 'API toolkit (React Query + Axios + Zod + RHF)',
  run: async ({ cwd }) => {
    // runtime deps (force npm)
    await exec(
      'npm',
      [
        'install',
        '@tanstack/react-query',
        'axios',
        'zod',
        'react-hook-form',
        '@hookform/resolvers',
      ],
      cwd,
    );

    // scaffold helpers
    await ensureDir(path.join(cwd, 'hooks'));

    const libDir = path.join(cwd, 'lib');
    await ensureDir(libDir);
    const distDir = path.dirname(fileURLToPath(import.meta.url));
    const httpSrc = await tpl(distDir, 'http.ts.tpl');
    await writeIfChanged(path.join(libDir, 'http.ts'), httpSrc);
  },
};

