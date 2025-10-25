import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onClose?.(); };
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password')
    };
    try {
      if (mode === 'login') await login(payload.email, payload.password);
      else await register(payload.name, payload.email, payload.password);
      onClose?.();
    } catch (err) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute inset-0 flex items-center justify-center p-4 transition ${open ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-neutral-200">
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
            <button onClick={onClose} className="text-sm text-neutral-500 hover:text-neutral-900">Close</button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-sm" htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900" />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900" />
            </div>
            <div className="space-y-1">
              <label className="text-sm" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required minLength={6} className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900" />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
            <p className="text-xs text-neutral-600 text-center">
              {mode === 'login' ? (
                <>
                  No account?{' '}
                  <button type="button" onClick={() => setMode('register')} className="text-neutral-900 underline">Create one</button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setMode('login')} className="text-neutral-900 underline">Sign in</button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
