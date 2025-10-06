import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

describe('templates', () => {
  it('theme-provider template contains NextThemesProvider', async () => {
    const p = path.join(__dirname, '../../src/templates/theme-provider.tsx.tpl');
    const s = await readFile(p, 'utf8');
    expect(s).toMatch('next-themes');
  });
});
