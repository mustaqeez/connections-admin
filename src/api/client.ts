const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status}: ${body}`)
  }
  return res.json()
}
