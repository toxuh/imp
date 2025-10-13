import type { Step } from '../types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDir, writeIfChanged } from '../services/fs.service';
import { tpl } from '../services/template.service';

export const stepThemeProvider: Step = {
  name: 'layout/page to arrow + ThemeProvider',
  run: async ({ cwd, withHttp }) => {
    const componentsDir = path.join(cwd, 'components');
    await ensureDir(componentsDir);

    const distDir = path.dirname(fileURLToPath(import.meta.url));
    const providerSrc = await tpl(distDir, 'theme-provider.tsx.tpl');
    await writeIfChanged(path.join(componentsDir, 'theme-provider.tsx'), providerSrc);

    if (withHttp) {
      const queryProviderSrc = await tpl(distDir, 'query-provider.tsx.tpl');
      await writeIfChanged(path.join(componentsDir, 'query-provider.tsx'), queryProviderSrc);
    }

    const appDir = path.join(cwd, 'app');
    await ensureDir(appDir);
    const layoutTpl = await tpl(distDir, withHttp ? 'layout.http.tsx.tpl' : 'layout.tsx.tpl');
    const pageTpl = await tpl(distDir, 'page.tsx.tpl');

    await writeIfChanged(path.join(appDir, 'layout.tsx'), layoutTpl);
    await writeIfChanged(path.join(appDir, 'page.tsx'), pageTpl);
  },
};
