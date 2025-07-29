export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  name: string;
  authToken: string;
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.data?.message || '로그인 실패');
  }

  return json.data;
}
