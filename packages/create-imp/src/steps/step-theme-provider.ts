import type { Step } from '../types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDir, writeIfChanged } from '../services/fs.service';
import { tpl } from '../services/template.service';

export const stepThemeProvider: Step = {
  name: 'layout/page to arrow + ThemeProvider',
  run: async ({ cwd }) => {
    const componentsDir = path.join(cwd, 'components');
    await ensureDir(componentsDir);

    const here = path.dirname(fileURLToPath(import.meta.url));
    const base = path.join(here, '..');

    const providerSrc = await tpl(base, 'theme-provider.tsx.tpl');
    await writeIfChanged(path.join(componentsDir, 'theme-provider.tsx'), providerSrc);

    const appDir = path.join(cwd, 'app');
    await ensureDir(appDir);
    const layoutTpl = await tpl(base, 'layout.tsx.tpl');
    const pageTpl = await tpl(base, 'page.tsx.tpl');

    await writeIfChanged(path.join(appDir, 'layout.tsx'), layoutTpl);
    await writeIfChanged(path.join(appDir, 'page.tsx'), pageTpl);
  },
};
