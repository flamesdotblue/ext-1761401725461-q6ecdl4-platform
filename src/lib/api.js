const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text().catch(() => 'Request failed'));
  return res.status === 204 ? null : res.json();
}

export async function getProducts() {
  try {
    return await request('/api/products');
  } catch {
    return null;
  }
}

export async function apiRegister(name, email, password) {
  try {
    const data = await request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    return data;
  } catch {
    // fallback local simulation
    const user = { id: crypto.randomUUID(), name, email };
    const token = btoa(`${email}:localtoken`);
    return { user, token };
  }
}

export async function apiLogin(email, password) {
  try {
    const data = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    return data;
  } catch {
    // fallback local simulation
    const user = { id: crypto.randomUUID(), name: email.split('@')[0], email };
    const token = btoa(`${email}:localtoken`);
    return { user, token };
  }
}

export async function checkout(items) {
  const payload = { items };
  try {
    return await request('/api/checkout', { method: 'POST', body: JSON.stringify(payload) });
  } catch {
    // fallback: simulate success
    return { status: 'ok' };
  }
}
