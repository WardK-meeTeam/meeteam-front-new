import { afterEach, describe, expect, it, vi } from 'vitest';

import { loginMember } from './loginApi';

const originalFetch = global.fetch;

afterEach(() => {
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

describe('loginMember', () => {
  it('returns the authenticated session when backend login succeeds', async () => {
    const headers = new Headers({
      Authorization: 'Bearer test-access-token',
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers,
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
      accessToken: 'test-access-token',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/auth/login',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    );
  });

  it('throws when the access token header is missing', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers(),
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
    ).rejects.toThrow('로그인 응답에서 액세스 토큰을 받지 못했습니다.');
  });
});
