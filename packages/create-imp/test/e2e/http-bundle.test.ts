import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

vi.mock('../../src/services/shell.service', () => ({
  exec: async () => ({ code: 0 }),
}));

import { runSteps } from '../../src/steps';

describe('e2e http bundle', () => {
  let tmp: string;

  beforeAll(async () => {
    tmp = await mkdtemp(path.join(os.tmpdir(), 'create-imp-http-'));
    await runSteps({ cwd: tmp, withPrisma: false, withHttp: true, packageManager: 'npm', debug: false });
  });

  afterAll(async () => {
    await rm(tmp, { recursive: true, force: true });
  });

  it('writes query provider and layout with metadata type', async () => {
    await expect(
      readFile(path.join(tmp, 'components', 'query-provider.tsx'), 'utf8'),
    ).resolves.toContain('QueryClientProvider');

    const layout = await readFile(path.join(tmp, 'app', 'layout.tsx'), 'utf8');
    expect(layout).toContain('export const metadata: Metadata');
    expect(layout).toContain('QueryProvider');
  });

  it('creates hooks dir and http lib', async () => {
    await expect(stat(path.join(tmp, 'hooks'))).resolves.toBeDefined();
    await expect(
      readFile(path.join(tmp, 'lib', 'http.ts'), 'utf8'),
    ).resolves.toContain("export const http = axios.create");
  });
});

