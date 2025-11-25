# 📝 Quick Notes

Quick Notes adalah aplikasi catatan sederhana untuk menyimpan ide, pemikiran, ringkasan, dan informasi penting secara cepat. Dirancang dengan tampilan bersih, ringan, dan mudah digunakan—serta berjalan sepenuhnya di browser tanpa backend.

Aplikasi ini dibuat menggunakan **HTML, CSS, dan JavaScript murni**, dan menyimpan semua data catatan menggunakan **localStorage**.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi tidak membutuhkan instalasi atau server tambahan. Cukup ikuti langkah berikut:

1. Pastikan Anda memiliki tiga file berikut dalam satu folder yang sama:
   - `index.html`
   - `style.css`
   - `script.js`
2. Buka file `index.html` menggunakan browser apa pun (Chrome, Firefox, Edge, Safari).
3. Aplikasi langsung siap dipakai.

---

## ✨ Fitur Utama

### 🔹 1. Tambah Catatan Baru  
Buat catatan dengan judul dan isi melalui modal input yang sederhana dan mudah digunakan.

### 🔹 2. Edit Catatan  
Ubah catatan yang sudah ada melalui tombol **Edit** langsung pada card catatan.

### 🔹 3. Hapus Catatan  
Hapus catatan secara permanen dari daftar dengan tombol **Delete**.

### 🔹 4. Scroll Isi Catatan Panjang  
Jika isi catatan terlalu panjang, area isi catatan akan otomatis mendapat scrollbar sehingga tampilan tetap rapi.

### 🔹 5. Mode Gelap (Dark Mode)  
Toggle untuk beralih antara Light Mode dan Dark Mode secara instan.

### 🔹 6. Penyimpanan Lokal (localStorage)  
Semua catatan disimpan langsung di browser.  
Catatan tetap tersedia meski browser ditutup atau komputer direstart.

### 🔹 7. UI Minimalis & Playful  
Desain clean, modern, dan nyaman dilihat.

---

## 🛠️ Penjelasan Teknis

### ✔ 1. Penyimpanan Data  
Semua catatan disimpan sebagai array objek:

```js
localStorage.setItem("notes", JSON.stringify(notes));

### ✔ 2. Validasi Input
Judul tidak boleh kosong

Isi catatan tidak boleh kosong

Jika salah satu kosong, aplikasi akan menampilkan pesan kesalahan di form modal.