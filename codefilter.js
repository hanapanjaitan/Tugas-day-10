class Data {
    constructor(a, b, c, d, e){
        this.id = a
        this.kategori = b
        this.nama = c
        this.harga = d
        this.stok = e
    }

}

class DataFilter extends Data {
    constructor (a, b, c, d, e){
        super(a, b, c, d, e)
    }
}

var data = [
    new Data(12, 'Fast Food', 'KFC', 25000, 10),
    new Data(34, 'Pakaian', 'Gaun', 150000, 6),
    new Data(7, 'Kendaraan', 'Honda', 12000000, 5),
    new Data(13, 'Fast Food', 'McDonald', 35000, 5),
]

var datafilter = []


const funInputData=()=>{
    var id = Math.floor(Math.random() * 101)
    var nama = document.getElementById('nameInput').value
    var harga = document.getElementById('priceInput').value
    var kategori = document.getElementById('categoryInput').value
    var stok = document.getElementById('stockInput').value
    var obj = {id, kategori, nama, harga, stok}
    data.push(obj)
    tampilkanData()
}

const tampilkanData=()=>{
    var output = ''
    for(i=0;i<data.length;i++){
        output += `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].kategori}</td>
                        <td>${data[i].nama}</td>
                        <td>${data[i].harga}</td>
                        <td>${data[i].stok}</td>
                    </tr>`
    }
    document.getElementById('render').innerHTML = output
}

tampilkanData()

const funFilterName=()=>{
    var inputNama = document.getElementById('keyword')
    var filterNama = inputNama.value.toUpperCase()
    var output = ''
    console.log(filterNama)
    for(i=0; i<data.length; i++){
        valueText = data[i].nama.textContent || data[i].nama
        if(valueText.toUpperCase().indexOf(filterNama) > -1){
            console.log(data[i])
            output += `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].kategori}</td>
                            <td>${data[i].nama}</td>
                            <td>${data[i].harga}</td>
                            <td>${data[i].stok}</td>
                        </tr>`
            document.getElementById('render').innerHTML = output
        }else{
            console.log("ga sesuai" + data[i].nama)
            continue
        }
    }


}

// const filterNama=()=>{
//     var output = ''
//     for(j=0;j<data.length;j++){
//         output += `<tr>
//                         <td>${data[j].id}</td>
//                         <td>${data[j].kategori}</td>
//                         <td>${data[j].nama}</td>
//                         <td>${data[j].harga}</td>
//                         <td>${data[j].stok}</td>
//                     </tr>`
//     }
//     document.getElementById('render').innerHTML = output
// }

// const tampilkanDataFilter=()=>{
//     var output = ''
//     for(i=0;i<datafilter.length;i++){
//         output += `<tr>
//                         <td>${datafilter[i].id}</td>
//                         <td>${datafilter[i].kategori}</td>
//                         <td>${datafilter[i].nama}</td>
//                         <td>${datafilter[i].harga}</td>
//                         <td>${datafilter[i].stok}</td>
//                     </tr>`
//     }
//     document.getElementById('render').innerHTML = output
// }

const funFilterPrice=()=>{ // ada min max
    var hargaMin = document.getElementById('min').value // bug kalau min dr 0 diganti jadi 10
    var hargaMax = document.getElementById('max').value
    var selisih = hargaMax - hargaMin
    console.log('selisihnya ' + selisih)
    var output = ''

    for(i=0; i<data.length; i++){
        if(selisih >= data[i].harga || selisih == 0){
            output+= `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].kategori}</td>
                        <td>${data[i].nama}</td>
                        <td>${data[i].harga}</td>
                        <td>${data[i].stok}</td>
                    </tr>`
            document.getElementById('render').innerHTML = output 
        }
        else if(selisih < data[i].harga){
            document.getElementById('render').innerHTML = null
        }
    }

}

const funFilterCategory=()=>{
    var kategoriUser = document.getElementById('categoryFilter').value
    // var filterKategori = kategoriUser.toUpperCase()
    var output = ''
    for(i=0;i<data.length;i++){
        if(kategoriUser==data[i].kategori){
            console.log(data[i])
            output+= `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].kategori}</td>
                            <td>${data[i].nama}</td>
                            <td>${data[i].harga}</td>
                            <td>${data[i].stok}</td>
                        </tr>`
            document.getElementById('render').innerHTML = output 
        }else if(kategoriUser=='All'){
            tampilkanData()
        }
        else{
            console.log('ga cocok kategori ' + data[i].kategori)
            // document.getElementById('render').innerHTML = null
            continue
        }
    }
}

// const funFilterCategory=()=>{
//     var filterKategori = document.getElementById('categoryFilter').value
//     for(i=0; i<data.length; i++){
//         if(filterKategori==data[i].kategori){
//             datafilter.push(data[i])
//             console.log(datafilter)
//             break
//         }else if (filterKategori!==data[i].kategori){
//             datafilter = []
//             console.log(datafilter)
            
//         }else if (filterKategori=='All'){
//             datafilter = data
//             console.log(datafilter)
            
//         }
//     }
//     tampilkanDataFilter()
// }