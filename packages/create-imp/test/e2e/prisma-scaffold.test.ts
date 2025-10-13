import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

vi.mock('../../src/services/shell.service', () => ({
  exec: async () => ({ code: 0 }),
}));

import { runSteps } from '../../src/steps';

describe('e2e prisma scaffold', () => {
  let tmp: string;

  beforeAll(async () => {
    tmp = await mkdtemp(path.join(os.tmpdir(), 'create-imp-prisma-'));
    await runSteps({ cwd: tmp, withPrisma: true, withHttp: false, packageManager: 'npm', debug: false });
  });

  afterAll(async () => {
    await rm(tmp, { recursive: true, force: true });
  });

  it('writes prisma lib and adds /generated to .gitignore', async () => {
    await expect(
      readFile(path.join(tmp, 'lib', 'prisma.ts'), 'utf8'),
    ).resolves.toContain('new PrismaClient');

    await expect(
      readFile(path.join(tmp, '.gitignore'), 'utf8'),
    ).resolves.toContain('/generated');
  });
});

