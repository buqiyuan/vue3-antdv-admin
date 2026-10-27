import { describe, expect, it } from 'vitest';
import { confirmModalOk } from '@/hooks/useModal/confirmModalOk';

describe('modal confirm (#226)', () => {
  it('closes after a resolved OK handler', async () => {
    await expect(confirmModalOk(async () => 'ok')).resolves.toBe(true);
  });

  it('keeps the modal open when the OK handler rejects', async () => {
    const onOk = async () => {
      throw new Error('backend error');
    };
    await expect(confirmModalOk(onOk)).resolves.toBe(false);
  });
});
