import { fetchAuthSession } from 'aws-amplify/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { tokens } = await fetchAuthSession();
  const accessToken = tokens?.accessToken?.toString();
  if (!accessToken) {
    throw new Error('Not signed in');
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(`${response.status}: ${body.message ?? response.statusText}`);
  }
  return response.json() as Promise<T>;
}