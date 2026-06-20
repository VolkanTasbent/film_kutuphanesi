# Proje Teslim Formu — Film Kütüphanesi

Bu dosya, eğitim programı proje yönergesindeki tüm maddelerin karşılandığını gösterir. Teslim formuna aşağıdaki bilgileri kopyalayabilirsiniz.

---

## Proje Bilgileri

| Alan | Değer |
|------|-------|
| **Proje Adı** | Film Kütüphanesi |
| **Geliştirici** | *(Adınızı yazın)* |
| **Framework** | Vue 3 |
| **Build Aracı** | Vite |
| **CSS Kütüphanesi** | Tailwind CSS 4 |
| **Veri Saklama** | LocalStorage |
| **IDE** | Visual Studio Code / Cursor |

---

## Yönerge Uyum Tablosu

| # | Yönerge Maddesi | Durum | Açıklama |
|---|-----------------|-------|----------|
| 1 | Modern Javascript kütüphanesi seçimi | ✅ | Vue 3 kullanıldı |
| 2 | LocalStorage kullanımı | ✅ | `src/composables/useFilms.js` |
| 3 | Netlify/Vercel ile yayına alınabilir çerçeve | ✅ | Vite + `vercel.json` / `netlify.toml` |
| 4 | Kütüphane kurulumu | ✅ | `npm install` ile Vue, Vite, Tailwind kuruldu |
| 5 | IDE ile açılması | ✅ | VS Code / Cursor ile açılabilir |
| 6 | Components, Pages, Interfaces klasörleri | ✅ | `src/Components`, `src/Pages`, `src/Interfaces` |
| 7 | Tailwind / Bootstrap / Pure CSS | ✅ | Tailwind CSS 4 |
| 8 | TODO benzeri CRUD uygulaması | ✅ | Film takip uygulaması (CRUD) |
| 9 | Ekle işlemi | ✅ | `addFilm()` — FilmForm bileşeni |
| 10 | Listeleme işlemi | ✅ | `FilmList` + `FilmCard` bileşenleri |
| 11 | Güncelleme işlemi | ✅ | `updateFilm()` — Düzenle butonu |
| 12 | Silme işlemi | ✅ | `deleteFilm()` — Sil butonu |
| 13 | En az 1 ekran görüntüsü | ✅ | `screenshots/ana-ekran.png` |
| 14 | GitHub public repo | ⏳ | Aşağıdaki linke yükleyin |
| 15 | Vercel / Netlify yayını | ⏳ | Aşağıdaki adımlarla yayınlayın |

---

## Teslim Formuna Yazılacak Linkler

> GitHub ve Vercel adımlarını tamamladıktan sonra bu alanları doldurun.

**GitHub Repository Linki:**
```
https://github.com/VolkanTasbent/film_kutuphanesi
```

**Canlı Site (Vercel) Linki:**
```
https://film-kutuphanesi.vercel.app
```
*(Vercel size otomatik bir URL verecektir; yukarıdaki örnek yerine kendi URL'nizi yazın.)*

---

## CRUD İşlemleri — Teknik Detay

### 1. Ekle (Create)
- **Dosya:** `src/Components/FilmForm.vue`, `src/composables/useFilms.js`
- **Fonksiyon:** `addFilm(payload)`
- Form doldurulup "Filmi Ekle" butonuna basıldığında yeni film listeye eklenir.

### 2. Listele (Read)
- **Dosya:** `src/Components/FilmList.vue`, `src/Components/FilmCard.vue`
- Tüm filmler kart görünümünde listelenir; arama ve filtreleme desteklenir.

### 3. Güncelle (Update)
- **Dosya:** `src/Components/FilmForm.vue`, `src/composables/useFilms.js`
- **Fonksiyon:** `updateFilm(id, payload)`
- Karttaki "Düzenle" butonu formu doldurur; "Değişiklikleri Kaydet" ile güncellenir.

### 4. Sil (Delete)
- **Dosya:** `src/Pages/HomePage.vue`, `src/composables/useFilms.js`
- **Fonksiyon:** `deleteFilm(id)`
- "Sil" butonu onay penceresi sonrası kaydı kaldırır.

---

## Proje Çıktıları

| Çıktı | Karşılama |
|-------|-----------|
| HTML temelleri | `index.html`, semantik Vue şablonları |
| CSS temelleri | Tailwind CSS ile responsive tasarım |
| Javascript temelleri | ES6+ modüller, composable yapısı |
| Vue kütüphanesi | Components, reactive state, computed, watch |
| GitHub deneyimi | Public repo oluşturma ve push |
| Gerçek frontend projesi | Tam CRUD SPA uygulaması |

---

## GitHub'a Yükleme (Adım Adım)

```bash
cd ~/development/film-kutuphanesi
git commit -m "Film Kütüphanesi - Vue 3 CRUD eğitim projesi"
gh auth login
gh repo create film-kutuphanesi --public --source=. --remote=origin --push
```

Alternatif (GitHub web arayüzünden repo oluşturduysanız):

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/film-kutuphanesi.git
git push -u origin main
```

---

## Vercel'a Yayınlama (Adım Adım)

1. https://vercel.com adresine gidin, GitHub ile giriş yapın
2. **Add New Project** → `film_kutuphanesi` reposunu seçin
3. Ayarlar otomatik gelir (`vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Deploy** butonuna tıklayın
5. Oluşan URL'yi teslim formuna yapıştırın

---

## Netlify'a Yayınlama (Alternatif)

1. https://www.netlify.com adresine gidin ve giriş yapın
2. **Add new site → Import an existing project**
3. GitHub hesabınızı bağlayın ve `film-kutuphanesi` reposunu seçin
4. Ayarlar otomatik gelir (`netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy site** butonuna tıklayın
6. Oluşan URL'yi teslim formuna yapıştırın

---

## Ekran Görüntüsü

![Ana Ekran](./screenshots/ana-ekran.png)

---

## Proje Dosya Ağacı

```
film-kutuphanesi/
├── public/
│   └── favicon.svg
├── screenshots/
│   └── ana-ekran.png
├── src/
│   ├── Components/
│   │   ├── AppHeader.vue
│   │   ├── FilmCard.vue
│   │   ├── FilmForm.vue
│   │   ├── FilmList.vue
│   │   └── StatsBar.vue
│   ├── Pages/
│   │   └── HomePage.vue
│   ├── Interfaces/
│   │   └── Film.js
│   ├── composables/
│   │   └── useFilms.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── netlify.toml
├── package.json
├── README.md
└── PROJE_TESLIM.md
```
