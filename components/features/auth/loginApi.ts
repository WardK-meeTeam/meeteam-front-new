import type {
  ApiEnvelope,
  LoginRequestPayload,
  SejongLoginApiResult,
  SejongLoginResponse,
} from '@/types/auth';

import { extractApiData } from './signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';
const LOGIN_REQUEST_ERROR_MESSAGE = '로그인 처리 중 오류가 발생했습니다.';

async function readJson<T>(response: Response) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    const errorMessage =
      typeof payload?.message === 'string' ? payload.message : LOGIN_REQUEST_ERROR_MESSAGE;
    throw new Error(errorMessage);
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return payload;
}

function normalizeLoginResponse(payload: SejongLoginApiResult): SejongLoginResponse {
  const isNewMember = payload.isNewMember ?? payload.newMember;

  if (typeof isNewMember !== 'boolean') {
    throw new Error('로그인 응답 형식을 해석할 수 없습니다.');
  }

  return {
    isNewMember,
    code: payload.code ?? null,
  };
}

export async function loginMember(payload: LoginRequestPayload): Promise<SejongLoginResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/login/sejong`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        studentId: payload.studentId.trim(),
        password: payload.password,
      }),
    });
  } catch {
    throw new Error(LOGIN_REQUEST_ERROR_MESSAGE);
  }

  const data = await readJson<SejongLoginApiResult>(response);
  return normalizeLoginResponse(extractApiData(data));
}

export async function logoutMember() {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<string> | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? '로그아웃 처리 중 오류가 발생했습니다.');
  }
}

export async function withdrawMember() {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/withdraw`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<string> | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? '회원 탈퇴 처리 중 오류가 발생했습니다.');
  }
}

export async function deleteMemberPermanently() {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/delete`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<string> | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? '회원 삭제 처리 중 오류가 발생했습니다.');
  }
}
