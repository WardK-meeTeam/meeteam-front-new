import type {
  ApiEnvelope,
  AuthSession,
  LoginRequestPayload,
  LoginSuccessResponse,
} from '@/types/auth';

import { extractApiData } from './signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

async function readJson<T>(response: Response) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    const errorMessage =
      typeof payload?.message === 'string'
        ? payload.message
        : '로그인 처리 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return payload;
}

export async function loginMember(payload: LoginRequestPayload): Promise<AuthSession> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
    }),
  });

  const data = await readJson<LoginSuccessResponse>(response);
  const authorizationHeader = response.headers.get('Authorization');
  const accessToken = authorizationHeader?.replace(/^Bearer\s+/i, '').trim();

  if (!accessToken) {
    throw new Error('로그인 응답에서 액세스 토큰을 받지 못했습니다.');
  }

  return {
    ...extractApiData(data),
    accessToken,
  };
}
