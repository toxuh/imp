import { describe, it, expect, vi } from 'vitest';
import { EventEmitter } from 'node:events';

let exitCode = 0;
vi.mock('node:child_process', () => {
  return {
    spawn: () => {
      const ee = new EventEmitter();
      setTimeout(() => ee.emit('close', exitCode), 0);
      // minimal shape compatible with spawn listeners
      return ee as any;
    },
  };
});

import { exec } from '../../src/services/shell.service';

describe('shell.exec', () => {
  it('resolves on exit code 0', async () => {
    exitCode = 0;
    await expect(exec('echo', ['ok'], process.cwd())).resolves.toEqual({ code: 0 });
  });

  it('rejects on non-zero exit code', async () => {
    exitCode = 1;
    await expect(exec('echo', ['fail'], process.cwd())).rejects.toThrow();
  });
});
