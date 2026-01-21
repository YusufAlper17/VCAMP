# vcamp-react

React + Vite projesi - GitHub Pages'de yayınlanmaktadır.

## 🚀 Canlı Demo

Projeyi buradan görüntüleyebilirsiniz: `https://KULLANICI_ADINIZ.github.io/vcamp-react/`

## 📦 Kurulum

```bash
npm install
```

## 🛠️ Geliştirme

```bash
npm run dev
```

Proje `http://localhost:5173/` adresinde çalışacaktır.

## 🏗️ Build

```bash
npm run build
```

## 🌐 GitHub Pages'e Deploy

### Otomatik Deploy (Önerilen)

Projeyi GitHub'a push ettiğinizde otomatik olarak deploy edilir:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Manuel Deploy

```bash
npm run deploy
```

## ⚙️ GitHub Pages Ayarları

1. GitHub repository'nize gidin
2. **Settings** > **Pages** sekmesine gidin
3. **Source** olarak **GitHub Actions** seçin
4. Kod push ettiğinizde otomatik deploy başlayacaktır

## 📝 Önemli Notlar

- `vite.config.js` dosyasındaki `base` değerini kendi repository adınıza göre güncelleyin
- GitHub Actions workflow'u `.github/workflows/deploy.yml` dosyasında tanımlıdır
- Build çıktıları `dist` klasörüne oluşturulur

## 🔧 Teknolojiler

- React 19.2.0
- Vite 7.2.4
- React Router DOM 7.12.0
- OGL 1.0.11

## 📄 Lisans

MIT
