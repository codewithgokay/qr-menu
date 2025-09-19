'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PasswordChangeFormProps {
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<void>;
}

export function PasswordChangeForm({ onPasswordChange }: PasswordChangeFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Tüm alanları doldurun');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      return;
    }

    if (newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalı');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Yeni şifre mevcut şifre ile aynı olamaz');
      return;
    }

    try {
      setIsLoading(true);
      await onPasswordChange(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Şifre değiştirilirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-soft border border-warm-beige rounded-lg hover:shadow-elevated transition-all duration-300">
      <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">Şifre Değiştir</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-text-primary mb-2">
            Mevcut Şifre
          </label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Mevcut şifrenizi girin"
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-text-primary mb-2">
            Yeni Şifre
          </label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Yeni şifrenizi girin"
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
            Yeni Şifre Tekrar
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Yeni şifrenizi tekrar girin"
            className="w-full"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            Şifre başarıyla değiştirildi!
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-sage hover:bg-sage/90 text-white"
        >
          {isLoading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
        </Button>
      </form>
    </Card>
  );
}
