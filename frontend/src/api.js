const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = payload?.error || payload?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

export function signup(body) {
  return request('/user/signup', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function signin(body) {
  return request('/user/signin', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export async function uploadRecord(file, token) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/records/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || 'Upload failed');
  }

  return payload;
}

export async function downloadRecord(id, token) {
  const response = await fetch(`${API_BASE_URL}/records/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload?.error || payload?.message || 'Download failed');
  }

  const blob = await response.blob();
  return blob;
}
