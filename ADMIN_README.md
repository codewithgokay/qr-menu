# 🔐 QR Menu Admin System

## Güvenli Admin Paneli

Bu QR menü sistemi, restoran sahiplerinin menülerini kolayca yönetebilmeleri için güvenli bir admin paneli içerir.

## 🚀 Özellikler

### Güvenlik
- **Kimlik Doğrulama**: Kullanıcı adı ve şifre ile giriş
- **URL Parametresi Kontrolü**: Admin paneline sadece `?admin=true` ile erişim
- **Oturum Yönetimi**: Güvenli çıkış ve oturum kontrolü
- **Müşteri Görünümü**: Normal kullanıcılar admin kontrollerini görmez

### Admin Paneli Özellikleri
- **Dashboard**: İstatistikler ve genel bakış
- **Ürün Yönetimi**: Ekleme, düzenleme, silme
- **Resim Yükleme**: Drag & drop ile resim yükleme
- **Kategori Yönetimi**: Mevcut kategorilerle çalışma
- **Veri Yedekleme**: JSON formatında veri yedekleme
- **Türkçe Arayüz**: Tam Türkçe lokalizasyon

## 🔑 Giriş Bilgileri

**Demo Giriş:**
- Kullanıcı Adı: `admin`
- Şifre: `admin123`

## 📱 Kullanım

### Müşteri Görünümü
1. Web sitesini normal şekilde ziyaret edin
2. Menüyü görüntüleyin ve QR kod ile paylaşın
3. Admin butonu sağ alt köşede görünür

### Admin Erişimi
1. **Yöntem 1**: Sağ alt köşedeki 🔐 butonuna tıklayın
2. **Yöntem 2**: URL'ye `?admin=true` ekleyin
3. Giriş bilgilerini girin
4. Admin paneline erişim sağlayın

### Admin Paneli Kullanımı

#### Dashboard
- Toplam ürün sayısı
- Kategori dağılımı
- Ortalama fiyat
- Popüler ürünler
- Diyet seçenekleri istatistikleri

#### Ürün Yönetimi
- **Yeni Ürün Ekleme**: Form ile detaylı ürün bilgileri
- **Ürün Düzenleme**: Mevcut ürünleri güncelleme
- **Ürün Silme**: Onay ile güvenli silme
- **Resim Yükleme**: Yerel dosya yükleme ve önizleme

#### Ayarlar
- **Veri Yedekleme**: JSON formatında indirme
- **Veri Sıfırlama**: Tüm verileri temizleme
- **Sistem Bilgileri**: Mevcut durum görüntüleme

## 🛠️ Teknik Detaylar

### Veri Depolama
- **localStorage**: Menü verileri tarayıcıda saklanır
- **sessionStorage**: Admin oturumu güvenli şekilde yönetilir
- **Base64**: Resimler base64 formatında saklanır

### Güvenlik Önlemleri
- Admin paneline sadece URL parametresi ile erişim
- Tüm admin fonksiyonları kimlik doğrulama gerektirir
- Oturum bilgileri tarayıcı kapatıldığında silinir
- Müşteri görünümünde admin kontrolleri gizli

### Responsive Tasarım
- Mobil uyumlu admin paneli
- Touch-friendly arayüz
- Modern glassmorphism tasarım
- Smooth animasyonlar

## 🌐 Türkçe Lokalizasyon

- Tüm arayüz metinleri Türkçe
- Türk Lirası (₺) para birimi
- Türkçe tarih formatları
- Türkçe kategori isimleri

## 📋 Kategori Yapısı

- **Mezeler**: Başlangıç yemekleri
- **Makarna**: Taze makarna yemekleri  
- **Pizza**: Odun ateşinde pizzalar
- **Ana Yemekler**: Doyurucu ana yemekler
- **Tatlılar**: Tatlı sonlar
- **İçecekler**: İçecekler ve daha fazlası

## 🔧 Geliştirici Notları

### Admin Erişimi Kontrolü
```javascript
// URL parametresi kontrolü
const isAdminRequested = isAdminAccessRequested();

// Kimlik doğrulama kontrolü
const isAuthenticated = isAuthenticated();
```

### Veri Güncelleme
```javascript
// localStorage'dan veri yükleme
const savedItems = localStorage.getItem('qr_menu_items');

// Veri kaydetme
localStorage.setItem('qr_menu_items', JSON.stringify(items));
```

### Resim Yükleme
```javascript
// Base64'e dönüştürme
const reader = new FileReader();
reader.onload = (e) => {
  setImagePreview(e.target.result);
};
reader.readAsDataURL(file);
```

## 🚀 Deployment

1. Projeyi build edin: `npm run build`
2. Static dosyaları sunucuya yükleyin
3. Admin paneline `yoursite.com?admin=true` ile erişin
4. Giriş bilgilerini değiştirin (production için)

## 📞 Destek

Herhangi bir sorun veya öneri için:
- GitHub Issues kullanın
- Admin paneli içindeki sistem bilgilerini kontrol edin
- Tarayıcı konsolunu kontrol edin

---

**Not**: Bu admin sistemi demo amaçlıdır. Production kullanımı için güvenlik önlemlerini artırın ve giriş bilgilerini değiştirin.
