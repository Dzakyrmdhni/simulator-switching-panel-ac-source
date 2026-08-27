# Ladder PLC — Monitoring Status Switch

Dokumen ini menjelaskan logika ladder generik yang digunakan dalam simulator. Logika hanya membaca status digital dan menyalakan indikator. Tidak ada perintah operasi peralatan maupun interlock keselamatan.

## Pemetaan I/O

| Input | Perangkat | Output lampu | Keterangan |
|---|---|---|---|
| `I0.0` | LBS-A | `Q0.0` | Status Load Break Switch Gardu A |
| `I0.1` | ES-A | `Q0.1` | Status Earthing Switch Gardu A |
| `I0.2` | TIE | `Q0.2` | Status Switch Daya Antargardu |
| `I0.3` | LBS-B | `Q0.3` | Status Load Break Switch Gardu B |
| `I0.4` | ES-B | `Q0.4` | Status Earthing Switch Gardu B |

## Logika setiap rung

Setiap input menggunakan kontak **normally open**. Ketika input bernilai `1`, coil output indikator ikut bernilai `1`.

```text
Rung 1: I0.0 → Q0.0
Rung 2: I0.1 → Q0.1
Rung 3: I0.2 → Q0.2
Rung 4: I0.3 → Q0.3
Rung 5: I0.4 → Q0.4
```

Alamat di atas adalah contoh. Alamat nyata harus disesuaikan dengan merek PLC, konfigurasi modul, gambar wiring, dan ketentuan pembimbing lapangan.

## Batasan versi 1.0

- Tidak ada interlock antara LBS dan earthing switch.
- Tidak ada urutan switching otomatis.
- Tidak ada simulasi tegangan, arus, trip, atau gangguan.
- Tidak boleh dipakai sebagai SOP operasi gardu nyata.

## Pengembangan berikutnya

Versi selanjutnya dapat menambahkan interlock edukatif, alarm kombinasi status, riwayat perubahan, dan mode latihan prosedur setelah logika divalidasi oleh pembimbing yang berwenang.
