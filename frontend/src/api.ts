const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

type RequestOptions = RequestInit & {
  headers?: HeadersInit;
};

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

export type AuthRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: AuthRole;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: AuthRole;
  createdAt?: string;
}

export interface SignInResponse {
  user: AuthUser;
  token: string;
}

export interface UploadRecordResponse {
  message: string;
  record: {
    id: number;
    filename?: string;
    cid: string;
    hash: string;
    patientId: number;
    createdAt?: string;
  };
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload: unknown = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorPayload = payload as ApiErrorPayload;
    const message = errorPayload?.error || errorPayload?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload as T;
}

export function signup(body: SignUpPayload): Promise<{ user: AuthUser }> {
  return request('/user/signup', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function signin(body: SignInPayload): Promise<SignInResponse> {
  return request('/user/signin', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export async function uploadRecord(file: File, token: string): Promise<UploadRecordResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/records/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const payload = (await response.json()) as UploadRecordResponse & ApiErrorPayload;

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || 'Upload failed');
  }

  return payload;
}

export async function downloadRecord(id: string, token: string): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/records/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as ApiErrorPayload;
    throw new Error(payload?.error || payload?.message || 'Download failed');
  }

  return response.blob();
}
