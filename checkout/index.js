let isDianter = true;

function pilihgd() {
    let pilih = document.getElementById('pilihgd');
    let ambil = document.getElementById('ambilgd');

    ambil.classList.add("hidden");
    ambil.classList.remove("block");
    pilih.classList.add("block");
    pilih.classList.remove("hidden");

    let pilihButton = document.getElementById('pilihButton');
    let ambilButton = document.getElementById('ambilButton');

    ambilButton.classList.remove('bg-[#FEE601]')
    ambilButton.classList.add('bg-[#FFFACC]', 'border' , 'border-[#FEE601]', 'hover:border-2', 'hover:border-black', 'hover:bg-[#FEE601]', 'hover:drop-shadow-xl')
    pilihButton.classList.add('bg-[#FEE601]')
    pilihButton.classList.remove('bg-[#FFFACC]', 'border' , 'border-[#FEE601]', 'hover:border-2', 'hover:border-black', 'hover:bg-[#FEE601]', 'hover:drop-shadow-xl')

    let jasa = document.getElementById('jasa');

    jasa.classList.remove('hidden')
    jasa.classList.add('flex')

    isDianter = true;

    let gdanter = document.getElementById('jenisPembelian')

    jenisPembelian.textContent = 'Dianter Teman'

    updateGedung()
}

function ambilgd() {
    let ambil = document.getElementById('ambilgd');

    ambil.classList.add("block");
    ambil.classList.remove("hidden");

    let pilih = document.getElementById('pilihgd');

    pilih.classList.add("hidden");
    pilih.classList.remove("block");

    let pilihButton = document.getElementById('pilihButton');
    let ambilButton = document.getElementById('ambilButton');

    ambilButton.classList.add('bg-[#FEE601]')
    ambilButton.classList.remove('bg-[#FFFACC]', 'border' , 'border-[#FEE601]', 'hover:border-2', 'hover:border-black', 'hover:bg-[#FEE601]', 'hover:drop-shadow-xl')
    pilihButton.classList.remove('bg-[#FEE601]')
    pilihButton.classList.add('bg-[#FFFACC]', 'border' , 'border-[#FEE601]', 'hover:border-2', 'hover:border-black', 'hover:bg-[#FEE601]', 'hover:drop-shadow-xl')

    let jasa = document.getElementById('jasa');

    jasa.classList.add('hidden')
    jasa.classList.remove('flex')

    isDianter = false

    let jenisPembelian = document.getElementById('jenisPembelian')

    jenisPembelian.textContent = 'Ambil Sendiri'

    let gdanter = document.getElementById('gdanter')
    
    gdanter.innerHTML = `<p class="text-sm text-[#6d6d6d]">Diambil di</p>
    <p class="font-bold text-lg">Basement Gedung Green Office Park 9</p>`
}

const totalItem = localStorage.getItem('checkout_totalItem');
const totalHarga = localStorage.getItem('checkout_totalHarga');
const hargaMakanan = localStorage.getItem('checkout_hargaMakanan')


document.getElementById('item-count').textContent = `${totalItem} item`;
document.getElementById('total-price').textContent = formatRupiah(totalHarga);
document.getElementById('hargaMakanan').textContent = formatRupiah(totalHarga);



function updateGedung() {
    let gdanter = document.getElementById('gdanter')
    let diantar = document.querySelector('input[name="bordered-radio"]:checked').value;
    
    gdanter.innerHTML = `<p class="text-sm text-[#6d6d6d]">Diantar ke</p>
    <p class="font-bold text-lg">${diantar}</p>`
}

updateGedung();

function updateCart() {
    let cartItem = JSON.parse(localStorage.getItem('cart_items'));
    let itemCard = document.getElementById('itemCard');
    let totalHarga = 0;
    
    
    for (let i = 0; i < cartItem.length; i++) {
        itemCard.innerHTML += `
        <div class="flex gap-4 items-start mb-8">
        <img src="${ cartItem[i].imageUrl }"
        class="w-48 h-48 rounded-md object-cover shadow" alt="...">
        <div class="flex justify-between items-center flex-1">
        <div>
        <h3 class="font-[Nunito Sans] text-2xl font-bold mb-6">${ cartItem[i].nama }</h4>
        <h5 class="font-[Nunito Sans] text-xl font-bold mb-6">Rp ${ cartItem[i].harga }</h5>
        </div>
        
        <!-- Tombol Qty -->
        <div class="flex items-center gap-1">
        <button onclick="removeItem('${ cartItem[i].id }')"
        class="bg-gray-600 text-white px-2 rounded">-</button>
        <span id="qty-${ cartItem[i].id }">${ cartItem[i].jumlah }</span>
        <button onclick="addItem('${ cartItem[i].id }', ${ cartItem[i].harga })"
        class="bg-yellow-600 text-white px-2 rounded">+</button>
        </div>
        </div>
        </div>
        `
        totalHarga += cartItem[i].harga * cartItem[i].jumlah;     
    }
    updateTotalHarga();
}

updateCart();

function updateTotalHarga() {
    let hargaFinal = 0;
    let teksTotalHarga = document.getElementById('hargaMakanan')
    let teksHargaFinal = document.getElementById('totalHarga')

    teksTotalHarga.textContent = "Rp " + totalHarga;
    
    if (isDianter) {
        hargaFinal = 20_000 + totalHarga;
    } else {
        hargaFinal = totalHarga
    }
    
    teksHargaFinal.textContent = "Rp " + hargaFinal;
    
}




