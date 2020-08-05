class Barang {
    constructor(a, b, c){
        this.nama = a
        this.harga = b
        this.gambar = c
    }
}

var barang =[
    new Barang('Cadbury', 13000, '<img src="https://images.heb.com/is/image/HEBGrocery/001151134" alt="E.C" width="100" height="100">'),
    new Barang('Kinder Joy', 10000, '<img src="https://i5.walmartimages.com/asr/aeb228e7-d065-499e-ae33-6a61762d1eba_1.16106c14b1a7fdcc6798d2ef4681aa97.jpeg" alt="E.C" width="100" height="100">'),
    new Barang('KitKat', 20000, '<img src="https://www.hersheys.com/is/image/content/dam/smartlabelproductsimage/kitkat/00034000226702-0010.png?wid=570&hei=570&fmt=png-alpha" alt="E.C" width="100" height="100">')
]

const tampilkanBarang=()=>{
    var output = ''
    for(i=0;i<barang.length;i++){
        output += `<tr><td>${i+1}</td>
        <td>${barang[i].nama}</td>
        <td>${barang[i].harga}</td>
        <td>${barang[i].gambar}</td>
        <td><input type="button" id="cart${i+1}" onclick="addCart(this.id)" value="add to cart"></td></tr>`
    }
    document.getElementById('daftarBarang').innerHTML = output
}

tampilkanBarang()

var keranjang = document.getElementById('notif')
var checkout = document.getElementById('userCheckout')
keranjang.innerHTML = '<h2>Keranjang masih kosong</h2>'

class Cart extends Barang{
    constructor(a, b, c){
        super(a, b, c)
    }
}

var cart = []

const addCart=(num)=>{
    for(i=0; i<barang.length;i++){
        if(num==`cart${i+1}`){
            confirmCart = confirm(`apa anda yakin menambahkan ${barang[i].nama} ke cart anda?`)
            if(confirmCart){
                cart.push(new Cart(barang[i].nama, barang[i].harga, barang[i].gambar))
            }else{
                break
            }

        }
    }
    tampilkanCart()
}

const hapusCart=(num)=>{
    for(i=0; i<cart.length;i++){
        if(num==`hapus${i+1}`){
            confirmDelCart = confirm(`apa anda yakin menghapus ${cart[i].nama} dari cart anda?`)
            if(confirmDelCart){
                cart.splice(i,1)
            }else{
                break
            }

        }
    }
    tampilkanCart()
}

const tampilkanCart=()=>{
    var output = ''
    for(i=0;i<cart.length;i++){
        output += `<tr><td>${i+1}</td>
        <td>${cart[i].nama}</td>
        <td>${cart[i].harga}</td>
        <td>${cart[i].gambar}</td>
        <td><input type="button" id="hapus${i+1}" onclick="hapusCart(this.id)" value="delete"></td></tr>`
    }
    document.getElementById('daftarCart').innerHTML = output
    notifBelanja()
}

const notifBelanja=()=>{
    if (cart.length==0){
        keranjang.innerHTML = '<h2>Keranjang masih kosong</h2>'
        checkout.innerHTML = null
    }else{
        totalBayar = 0
        for(i=0;i<cart.length;i++){
            totalBayar += cart[i].harga
        }
        keranjang.innerHTML = `<h2>Total belanja anda ada ${cart.length}</h2>
        <p>Total yang harus dibayar sebesar Rp ${totalBayar}</p>`
        checkout.innerHTML = `<input type="button" id="checkout" onclick=mauCheckout() value="Checkout">`
    }
}

const mauCheckout=()=>{
    var waktuSisa = 30
    checkout.innerHTML = `<p>Waktu tersisa <span id="waktu">${waktuSisa} </span> detik </p>
                            <tr>
                               <td><input type="number" id="paymentUser" placeholder="bayar disini..."></td>
                               <td><input type="button" onClick="pay()" value="Bayar"</td>
                           </tr>`
    var timer = setInterval(() => {
         waktuSisa --
         document.getElementById('waktu').textContent = waktuSisa
         if(waktuSisa<=0){
             clearInterval(timer)
             checkout.innerHTML = null
             cart = []
             tampilkanCart()
         }
     }, 1000);
}

const pay=()=>{
    var moneyUser = document.getElementById('paymentUser').value
    if (moneyUser<totalBayar){
        alert(`Maaf, uang anda kurang Rp ${totalBayar-moneyUser}. Tolong input ulang`)
        // tambahin confirm
    }else{
        alert('Terimakasih')
        alert(`Kembalian anda Rp ${moneyUser-totalBayar}`)
        checkout.innerHTML = null
        cart = []
        tampilkanCart()
    }
}