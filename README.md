# Film Kütüphanesi

Vue 3 ile geliştirilmiş kişisel film takip uygulaması. İzlenecek, izlenen ve favori filmlerinizi ekleyebilir, listeleyebilir, güncelleyebilir ve silebilirsiniz.

**Canlı Site:** [https://film-kutuphanesi-eight.vercel.app/](https://film-kutuphanesi-eight.vercel.app/)  
**GitHub:** [https://github.com/VolkanTasbent/film_kutuphanesi](https://github.com/VolkanTasbent/film_kutuphanesi)

## Kullanılan Teknolojiler

| Alan | Seçim |
|------|-------|
| Framework | Vue 3 |
| Build Tool | Vite |
| CSS | Tailwind CSS 4 |
| Veri Saklama | LocalStorage |
| Yayın | Vercel |

## Özellikler

- **Ekle** — Yeni film kaydı oluşturma
- **Listele** — Filmleri kart görünümünde listeleme
- **Güncelle** — Mevcut film bilgilerini düzenleme
- **Sil** — Film kaydını silme
- **LocalStorage** — Veriler tarayıcıda saklanır
- **Filtreleme** — Durum, tür ve arama ile filtreleme

## Proje Yapısı

```
film-kutuphanesi/
├── public/
├── screenshots/
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Interfaces/
│   ├── composables/
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── vercel.json
└── package.json
```

## Kurulum

```bash
git clone https://github.com/VolkanTasbent/film_kutuphanesi.git
cd film_kutuphanesi
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır.

## Build

```bash
npm run build
npm run preview
```

## Ekran Görüntüsü

![Film Kütüphanesi Ana Ekran](./screenshots/ana-ekran.png)

## Proje Teslim Linkleri

| Alan | Link |
|------|------|
| GitHub | https://github.com/VolkanTasbent/film_kutuphanesi |
| Canlı Site (Vercel) | https://film-kutuphanesi-eight.vercel.app/ |

## Geliştirici

Volkan Taşbent — Web Geliştirme / Javascript Eğitim Projesi
