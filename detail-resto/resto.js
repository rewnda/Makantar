// ==================== KERANJANG ====================

 // Menyimpan semua item yang ditambahkan ke keranjang, dalam bentuk objek: { id, harga, jumlah }
const cart = JSON.parse(localStorage.getItem('cart_items')) || [];

function toggleMenu(id) {
    // Menampilkan atau menyembunyikan elemen dengan ID tertentu (biasanya menu dropdown)
    document.getElementById(id).classList.toggle('hidden');
}

function formatRupiah(angka) {
    // Mengubah angka menjadi format mata uang Rupiah, misalnya 15000 → "Rp 15.000"
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function updateDisplay() {
    // Menampilkan ulang data keranjang (total item, total harga, jumlah per item, status tombol checkout)
    let totalItem = 0;         // Inisialisasi total item
    let totalHarga = 0;        // Inisialisasi total harga

    cart.forEach(item => {
        // Menambahkan jumlah dan harga masing-masing item ke total
        totalItem += item.jumlah;
        totalHarga += item.jumlah * item.harga;

        // Update tampilan jumlah item di UI jika elemen qty-<id> ditemukan
        const qtySpan = document.getElementById('qty-' + item.id);
        if (qtySpan) qtySpan.textContent = item.jumlah;
    });

    // Menampilkan total jumlah item di elemen #item-count
    document.getElementById('item-count').textContent = totalItem + ' item';

    // Menampilkan total harga yang sudah diformat di elemen #total-price
    document.getElementById('total-price').textContent = formatRupiah(totalHarga);

    // Mengatur tombol checkout aktif/tidak tergantung isi keranjang
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        if (totalItem > 0) {
            // Aktifkan tombol checkout
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            // Nonaktifkan tombol checkout
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    // Simpan total item dan total harga ke localStorage
    localStorage.setItem('checkout_totalItem', totalItem);
    localStorage.setItem('checkout_totalHarga', totalHarga);
    localStorage.setItem('cart_items', JSON.stringify(cart));
}

function addItem(id, harga, nama, imageUrl) {
    // Menambahkan item ke dalam keranjang berdasarkan ID dan harga
    const found = cart.find(item => item.id === id); // Cek apakah item sudah ada di keranjang

    if (found) {
        // Jika sudah ada, tambahkan jumlahnya
        found.jumlah++;
    } else {
        // Jika belum ada, masukkan sebagai item baru
        cart.push({
            id,
            harga,
            nama,
            jumlah: 1,
            imageUrl
        });
    }

    // Perbarui tampilan keranjang setelah penambahan
    updateDisplay();
    updateTotalHarga();
}

function removeItem(id) {
    // Mengurangi jumlah item dari keranjang berdasarkan ID
    const found = cart.find(item => item.id === id); // Cari item di keranjang

    if (found && found.jumlah > 0) {
        // Kurangi jumlah jika jumlah > 0
        found.jumlah--;

        // Perbarui tampilan setelah pengurangan
        updateDisplay();
    }
}

// ==================== AUTOCOMPLETE SEARCH ====================

const searchInput = document.getElementById("search");               // Referensi ke input search
const dropdown = document.getElementById("searchDropdown");          // Referensi ke dropdown hasil pencarian
const items = dropdown?.getElementsByTagName("li") || [];            // Ambil semua item <li> dalam dropdown (jika ada)

if (searchInput && dropdown) {
    // Jalankan hanya jika input dan dropdown ada di DOM

    searchInput.addEventListener("input", () => {
        // Event ketika pengguna mengetik sesuatu di kolom pencarian
        const value = searchInput.value.toLowerCase(); // Ambil nilai input dalam huruf kecil
        let hasMatch = false;                          // Flag apakah ada yang cocok

        for (let item of items) {
            // Iterasi semua item dalam dropdown
            const match = item.textContent.toLowerCase().includes(value); // Cek apakah item cocok
            item.style.display = match ? "block" : "none";                // Tampilkan/sembunyikan item
            hasMatch ||= match;                                           // Update flag jika ada yang cocok

            item.onclick = () => {
                // Saat item diklik dari dropdown
                const selected = item.textContent;

                // Panggil fungsi eksternal jika tersedia
                if (typeof updateDetailFromMenu === "function") {
                    updateDetailFromMenu(selected); // Update tampilan sesuai pilihan
                } else {
                    console.warn("updateDetailFromMenu() tidak tersedia."); // Log jika fungsi tidak ada
                }

                dropdown.classList.add("hidden"); // Sembunyikan dropdown
                searchInput.value = "";           // Kosongkan input setelah dipilih
            };
        }

        // Toggle visibilitas dropdown berdasarkan hasil pencarian
        dropdown.classList.toggle("hidden", !hasMatch || value === "");
    });

    document.addEventListener("click", (e) => {
        // Sembunyikan dropdown jika pengguna klik di luar searchInput atau dropdown
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("hidden");
        }
    });
}

