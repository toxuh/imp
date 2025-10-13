import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

vi.mock('../../src/services/shell.service', () => ({
  exec: async () => ({ code: 0 }),
}));

import { runSteps } from '../../src/steps';

describe('e2e dry-run', () => {
  let tmp: string;

  beforeAll(async () => {
    tmp = await mkdtemp(path.join(os.tmpdir(), 'create-imp-'));
    await runSteps({ cwd: tmp, withPrisma: false, withHttp: false, packageManager: 'npm', debug: false });
  });

  afterAll(async () => {
    await rm(tmp, { recursive: true, force: true });
  });

  it('writes theme provider and app files', async () => {
    await expect(
      readFile(path.join(tmp, 'components', 'theme-provider.tsx'), 'utf8'),
    ).resolves.toContain('NextThemesProvider');
    const layout = await readFile(path.join(tmp, 'app', 'layout.tsx'), 'utf8');
    expect(layout).toContain('ThemeProvider');
    expect(layout).toContain('export const metadata: Metadata');
    await expect(readFile(path.join(tmp, 'app', 'page.tsx'), 'utf8')).resolves.toContain(
      'const Page',
    );
  });
});
