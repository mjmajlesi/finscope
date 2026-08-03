import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Activity } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Simple demo auth — accept any credentials
    login(username.trim());
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-bg-card rounded-2xl p-8 mx-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Activity className="w-8 h-8 text-brand" />
          <span className="text-2xl font-bold text-text-primary">FinScope</span>
        </div>

        <h2 className="text-xl font-bold text-text-primary text-center mb-6">
          Sign In to Your Account
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-bg-card border border-bg-card-hover rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-card border border-bg-card-hover rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand/90 text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Any username and password will work for this demo.
        </p>
      </div>
    </div>
  );
}