const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8001/api';

async function fetchGateway(path: string, options?: RequestInit) {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Gateway error: ${res.status}`);
  return res.json();
}

export interface ReqForgeTask {
  id: string;
  title: string;
  phase: 'document_parsing' | 'requirement_extraction' | 'ontology_modeling' | 'quality_review' | 'artifact_generation' | 'done';
  status: 'pending' | 'running' | 'done' | 'failed';
  output?: Record<string, unknown>;
}

export async function chat(threadId: string, message: string) {
  const formData = new FormData();
  formData.append('message', message);
  const res = await fetch(`${GATEWAY_URL}/threads/${threadId}/runs`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(`Gateway error: ${res.status}`);
  return res.body;
}

export async function listModels() {
  return fetchGateway('/models');
}

export async function listSkills() {
  return fetchGateway('/skills');
}

export async function listMCPs() {
  return fetchGateway('/mcp');
}

export async function uploadFile(threadId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return fetchGateway(`/threads/${threadId}/files`, {
    method: 'POST',
    body: formData,
  });
}
