export const PROXY_URL = 'https://gemini-proxy-3.vercel.app/api/evidence-led-brief';

export async function askEvidenceAdvisor(action: 'synthesize-brief' | 'generate-info-gain', payload: Record<string, unknown>) {
  const response = await fetch(PROXY_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}
