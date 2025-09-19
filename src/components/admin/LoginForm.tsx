'use client';

import { useState } from 'react';
import { login } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(username, password)) {
      onLoginSuccess();
    } else {
      setError('Kullanıcı adı veya şifre hatalı');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-primary-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-soft border border-warm-beige">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">Admin Paneli</h1>
          <p className="text-text-secondary">Bella Vista Restoran Yönetimi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
              Kullanıcı Adı
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Şifre
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
              required
            />
          </div>

          {error && (
            <div className="text-destructive text-sm text-center bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sage hover:bg-sage/90 text-white font-semibold py-3 transition-colors"
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Demo: admin / admin123
          </p>
        </div>
      </Card>
    </div>
  );
}
