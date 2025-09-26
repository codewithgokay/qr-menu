'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { restaurant } from '@/data/menu';

export default function AdminAccessPage() {
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  // Simple admin access key (in production, this should be more secure)
  const ADMIN_ACCESS_KEY = 'admindukkan';

  const handleGenerateUrl = () => {
    if (adminKey !== ADMIN_ACCESS_KEY) {
      setError('Geçersiz admin anahtarı');
      return;
    }

    setError('');
    const timestamp = Date.now().toString();
    const url = `/admin?admin=true&t=${timestamp}`;
    setGeneratedUrl(url);
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(window.location.origin + generatedUrl);
      alert('URL panoya kopyalandı!');
    }
  };

  return (
    <div className="min-h-screen bg-primary-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-soft border border-warm-beige">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
            {restaurant.name}
          </h1>
          <p className="text-text-secondary">Admin Panel Erişimi</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="adminKey" className="block text-sm font-medium text-text-primary mb-2">
              Admin Anahtarı
            </label>
            <Input
              id="adminKey"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin anahtarınızı girin"
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
            onClick={handleGenerateUrl}
            className="w-full bg-sage hover:bg-sage/90 text-white font-semibold py-3 transition-colors"
          >
            Güvenli URL Oluştur
          </Button>

          {generatedUrl && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800 text-sm font-medium mb-2">
                  ✅ Güvenli admin URL&apos;i oluşturuldu
                </p>
                <p className="text-green-700 text-xs">
                  Bu URL 5 dakika geçerlidir. Tek kullanımlıktır.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => window.location.href = generatedUrl}
                  className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white font-semibold py-3"
                >
                  Admin Panel&apos;e Git
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-white border-sage/30 text-sage hover:bg-sage/5 hover:border-sage/50 hover:text-sage"
                >
                  Kopyala
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-text-secondary text-xs">
              Güvenlik: Bu sayfa sadece yetkili personel içindir.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
