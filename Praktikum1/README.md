<h1>Manajemen Tugas Kuliah</h1>

Aplikasi web sederhana untuk membantu mahasiswa mengelola semua tugas akademik mereka di satu tempat. Dibuat agar tidak ada lagi deadline yang terlewat atau tugas yang terlupakan.

Aplikasi ini dibangun menggunakan HTML, CSS, dan JavaScript murni tanpa framework dan menyimpan semua data secara lokal di browser.

<h2>Cara Menjalankan Aplikasi</h2>
Aplikasi ini tidak memerlukan instalasi atau server tambahan. Cukup ikuti langkah berikut:
<ol>
  <li>Pastikan memiliki tiga file ini: index.html, style.css, dan script.js dalam satu folder yang sama.</li>
  <li>Buka file index.html menggunakan browser web apa pun (seperti Google Chrome, Firefox, atau Safari).</li>
  <li>Selesai! Aplikasi siap digunakan.</li>
</ol>

<h2>Fitur Utama</h2>
Adapun fitur dari aplikasi ini adalah sebagai berikut:
<ol>
  <li><b>Tambah Tugas Baru:</b> Form interaktif untuk memasukkan nama tugas, mata kuliah, dan deadline.</li>
  <li><b>Edit Tugas:</b> Mengubah detail tugas yang sudah ada seperti nama, mata kuliah, dan deadline melalui jendela modal.    </li>
  <li><b>Hapus Tugas:</b> Menghapus tugas secara permanen dari daftar.</li>
  <li><b>Tandai Selesai:</b> Mengubah status tugas menjadi "selesai" atau "belum selesai" hanya dengan satu klik pada           checkbox.</li>
  <li><b>Penyimpanan Lokal:<b> Semua data tugas tersimpan di localStorage browser, sehingga tidak akan hilang meskipun          browser ditutup atau komputer dimatikan.</li>
  <li>Fitur Pencarian:
    <ul>
      <li>Mencari tugas secara real-time berdasarkan nama tugas atau mata kuliah.</li>
      <li>Memfilter daftar tugas berdasarkan status (Semua, Selesai, Belum Selesai).</li>
      <li>Menampilkan jumlah total tugas yang masih berstatus "belum selesai".</li>
    </ul>
  </li>
</ol>

<h2>Penjelasan Teknis</h2>
Dokumentasi singkat mengenai logika inti yang digunakan dalam aplikasi.

<ol>
  <li>Penyimpanan Data (localStorage)</li>
  <p>Penyimpanan: Setiap kali pengguna menambah, mengedit, menghapus, atau mengubah status tugas, seluruh daftar tugas (dalam format array JavaScript) dikonversi menjadi string JSON. String ini kemudian disimpan di localStorage dengan key tasks menggunakan localStorage.setItem('tasks', JSON.stringify(tasks)).</p>
  <p>Pengambilan: Saat halaman pertama kali dimuat, aplikasi akan memeriksa localStorage untuk key tasks. Jika data ditemukan, data tersebut diambil menggunakan localStorage.getItem('tasks') dan diubah kembali menjadi array JavaScript menggunakan JSON.parse() untuk ditampilkan ke pengguna.</p>
  <li>Validasi Form</li>
  <p>Untuk memastikan integritas data, validasi diterapkan pada sisi klien sebelum tugas ditambahkan.</p>
  <ul>
    <li>Nama Tugas & Mata Kuliah: Input tidak boleh kosong.</li>
    <li>Deadline: Wajib diisi dan tanggal yang dipilih tidak boleh merupakan tanggal di masa lalu.</li>
    <li>Mekanisme: Jika salah satu aturan di atas tidak terpenuhi saat pengguna menekan tombol "Tambah Tugas", proses akan dibatalkan. Pesan error yang informatif akan ditampilkan tepat di bawah kolom input yang salah untuk memandu pengguna.</li>
  </ul>
</ol>

<h2>Screenshot Fitur</h2>
<img width="1421" height="930" alt="image" src="https://github.com/user-attachments/assets/0a347f36-b476-44b8-a32e-e7ed58a7ea05" />
<img width="1402" height="389" alt="image" src="https://github.com/user-attachments/assets/3f068045-b645-43e9-9154-2254b79586a9" />
<img width="1396" height="246" alt="image" src="https://github.com/user-attachments/assets/1d053987-f419-4f03-8a15-8992a665a356" />
<img width="1403" height="259" alt="image" src="https://github.com/user-attachments/assets/b2f90aa7-ff7c-4876-bcd8-26460cb875d9" />
<img width="1391" height="169" alt="image" src="https://github.com/user-attachments/assets/68adda8c-d474-4fc0-83e9-7c060baed764" />




