import { afterEach, describe, expect, it, vi } from 'vitest';

import { loginMember } from './loginApi';

const originalFetch = global.fetch;

afterEach(() => {
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

describe('loginMember', () => {
  it('returns the authenticated session when backend login succeeds', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          name: '홍길동',
          memberId: 42,
        },
      }),
    } as Response);

    await expect(
      loginMember({
        email: 'hello@example.com',
        password: 'password123',
      }),
    ).resolves.toEqual({
      name: '홍길동',
      memberId: 42,
      email: 'hello@example.com',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/auth/login',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    );
  });
});
