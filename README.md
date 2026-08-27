# Simulator Switching Panel AC Gardu

Proyek pembelajaran untuk memahami GitHub, web interaktif, single-line diagram, dan dasar ladder PLC. Simulator menampilkan status ON/OFF lima perangkat pada rancangan generik dua gardu.

> **Catatan keselamatan:** proyek ini bukan SOP dan tidak boleh digunakan untuk mengoperasikan instalasi listrik nyata.

## Perangkat yang disimulasikan

- Load Break Switch Gardu A (`LBS-A`)
- Earthing Switch Gardu A (`ES-A`)
- Switch daya antargardu (`TIE`)
- Load Break Switch Gardu B (`LBS-B`)
- Earthing Switch Gardu B (`ES-B`)

## Menjalankan proyek

Pastikan Node.js sudah terpasang, lalu buka terminal pada folder proyek:

```bash
npm install
npm run dev
```

Buka alamat lokal yang muncul di terminal.

## Struktur penting

```text
app/page.tsx          Logika switch, SLD, dan ladder interaktif
app/globals.css       Tampilan dan responsivitas
docs/plc-ladder.md    Penjelasan pemetaan I/O PLC
README.md             Dokumentasi proyek
```

## Latihan GitHub pertama

### 1. Buat repository kosong di GitHub

Beri nama repository `simulator-switching-panel-ac`. Jangan tambahkan README dari GitHub karena file tersebut sudah ada pada proyek.

### 2. Hubungkan folder lokal

```bash
git init
git add .
git commit -m "Membuat simulator status switching panel AC"
git branch -M main
git remote add origin https://github.com/USERNAME/simulator-switching-panel-ac.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

### 3. Siklus perubahan berikutnya

```bash
git status
git add .
git commit -m "Menjelaskan fitur yang dibuat"
git push
```

## Latihan branch

Gunakan branch terpisah saat mencoba fitur baru:

```bash
git switch -c fitur/interlock
git push -u origin fitur/interlock
```

Setelah perubahan selesai, buat Pull Request di GitHub untuk menggabungkannya ke branch `main`.

## Batasan versi 1.0

Semua switch bekerja independen. Belum ada interlock, simulasi gangguan, perhitungan listrik, maupun urutan switching otomatis.
