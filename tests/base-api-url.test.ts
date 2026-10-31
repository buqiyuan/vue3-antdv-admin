import { describe, expect, it } from 'vitest';
import { DEMO_API_ORIGIN, isBlankApiUrlEnv, resolveBaseApiUrl } from '@/utils/baseApi';

describe('resolveBaseApiUrl', () => {
  it('keeps a custom origin for self-hosters', () => {
    expect(resolveBaseApiUrl('https://api.example.com', true)).toBe('https://api.example.com');
    expect(resolveBaseApiUrl('  https://api.example.com/base  ', true)).toBe(
      'https://api.example.com/base',
    );
  });

  it('keeps intentional /api for local and dev, including production', () => {
    expect(resolveBaseApiUrl('/api', false)).toBe('/api');
    expect(resolveBaseApiUrl('/api', true)).toBe('/api');
  });

  it('falls back to the public demo API in production when unset or blank', () => {
    expect(resolveBaseApiUrl(undefined, true)).toBe(DEMO_API_ORIGIN);
    expect(resolveBaseApiUrl(null, true)).toBe(DEMO_API_ORIGIN);
    expect(resolveBaseApiUrl('', true)).toBe(DEMO_API_ORIGIN);
    expect(resolveBaseApiUrl('   ', true)).toBe(DEMO_API_ORIGIN);
    expect(resolveBaseApiUrl("''", true)).toBe(DEMO_API_ORIGIN);
    expect(resolveBaseApiUrl('""', true)).toBe(DEMO_API_ORIGIN);
  });

  it('does not replace an empty dev value with the demo origin', () => {
    expect(resolveBaseApiUrl('', false)).toBe('');
    expect(resolveBaseApiUrl(undefined, false)).toBe('');
  });

  it('strips wrapping quotes pasted from an env file', () => {
    expect(resolveBaseApiUrl("'https://api.example.com'", true)).toBe('https://api.example.com');
    expect(resolveBaseApiUrl('"https://api.example.com"', false)).toBe('https://api.example.com');
  });

  it('treats only blank platform values as unset', () => {
    expect(isBlankApiUrlEnv(undefined)).toBe(false);
    expect(isBlankApiUrlEnv('')).toBe(true);
    expect(isBlankApiUrlEnv('   ')).toBe(true);
    expect(isBlankApiUrlEnv("''")).toBe(true);
    expect(isBlankApiUrlEnv('/api')).toBe(false);
    expect(isBlankApiUrlEnv('https://api.example.com')).toBe(false);
  });
});
