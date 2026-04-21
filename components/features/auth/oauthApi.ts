import type {
  ApiEnvelope,
  OAuth2RegisterRequestPayload,
  OAuth2RegisterSuccessResponse,
  OAuthTokenExchangeResponse,
} from '@/types/auth';

import { createApiError } from '@/components/features/auth/authError';
import { extractApiData } from './signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export type OAuthProvider = 'google' | 'github';
export type OAuthRedirectType = 'login' | 'register';

const OAUTH_LOGIN_ERROR_MESSAGE = 'OAuth 로그인 처리 중 오류가 발생했습니다.';
const OAUTH_REGISTER_ERROR_MESSAGE = 'OAuth 회원가입 처리 중 오류가 발생했습니다.';

async function readEnvelope<T>(response: Response, fallbackMessage: string) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    throw createApiError(response, payload, fallbackMessage);
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return extractApiData(payload);
}

export function buildOAuthAuthorizationUrl(provider: OAuthProvider) {
  return `${API_BASE_URL}/oauth2/authorization/${provider}`;
}

export async function exchangeOAuthToken(code: string) {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/token/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code }),
    });
  } catch {
    throw new Error(OAUTH_LOGIN_ERROR_MESSAGE);
  }

  return readEnvelope<OAuthTokenExchangeResponse>(response, OAUTH_LOGIN_ERROR_MESSAGE);
}

export async function registerOAuthMember(
  payload: OAuth2RegisterRequestPayload,
  file?: File | null,
) {
  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  if (file) {
    formData.append('file', file);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/register/oauth2`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  } catch {
    throw new Error(OAUTH_REGISTER_ERROR_MESSAGE);
  }

  return readEnvelope<OAuth2RegisterSuccessResponse>(response, OAUTH_REGISTER_ERROR_MESSAGE);
}
