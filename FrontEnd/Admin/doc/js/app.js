//Get list Customers
//----------------------------------------------------------------
getAllCustomer();

function getAllCustomer() {
    getCustomers(renderCustomers);
}

function getCustomers(callback) {
    fetch('http://localhost:8090/getAllListCustomer')
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderCustomers(customers) {

    var arrCustomers = [];
    customers.map(function(customer) {
        arrCustomers.push(customer);
    });
    var table = document.getElementById('list-customers');
    for (var i = 0; i < arrCustomers.length; i++) {
        var row = `<tr name="check${i}" value="${i}">

                    <td>${arrCustomers[i].maKhach}</td>        
                    <td>${arrCustomers[i].hoTenKhach}</td>
                    <td> ${arrCustomers[i].diaChi}</td>
                    <td>${arrCustomers[i].soDienThoai}</td>
                    <td>${arrCustomers[i].eMail}</td>
                    <td class="table-td-center"><button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="myFunction(this)"><i class="fas fa-trash-alt"></i>
                                </button>
                                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal" data-target="#ModalUP"><i class="fas fa-edit"></i>
                                </button>
                                </td>
                </tr>`
        table.innerHTML += row;

    }
}
//----------------------------------------------------------------


// Get list Tours
//----------------------------------------------------------------
getAllTours();

function getAllTours() {
    getTours(renderTours);
}

function getTours(callback) {
    fetch('http://localhost:8090/getAllListTour')
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderTours(Tours) {

    var arrTours = [];
    Tours.map(function(tour) {
        arrTours.push(tour);
    });
    var table = document.getElementById('list-Tours');
    for (var i = 0; i < arrTours.length; i++) {
        var row = `<tr class="item">
                    <td>${arrTours[i].maTour}</td>        
                    <td>${arrTours[i].tenTour}</td>
                    <td><img src="${arrTours[i].hinhAnh}" alt="" width="100px;"></td>
                    <td> ${arrTours[i].soNgay}</td>
                    <td>${arrTours[i].soNguoi}</td>
                    <td>${arrTours[i].giaTour}</td>
                    <td>${arrTours[i].maLoaiTour}</td>
                    <td>15-06-2022</td>
                    <td>${arrTours[i].gioiThieuTour}</td>
                    <td>Đang diễn ra</td>
                    <td class="table-td-center">
                    <button class="btn btn-sm editbtn btn-primary" type="button" title="Sửa" id="show-emp" data-toggle="modal"
                data-target="#ModalUP"><i class="fas fa-edit"></i>
            </button>
                    <button class="btn btn-primary btn-sm" type="button" title="ẩn"
                    onclick=""><i class="fas fa-eye-slash"></i>
                </button>
                       
                        <button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                            onclick=""><i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>`
        table.innerHTML += row;

    }

    $(document).ready(function() {
        $('.editbtn').on('click', function() {

            $('#ModalUP').modal('show');
            $tr = $(this).closest('tr');
            var data = $tr.children("td").map(function() {
                return $(this).text();
            }).get();

            var Imagedata = [];
            Imagedata.push($tr.find('img').attr('src'))


            data[2] = Imagedata[0];
            //$('#anhSanPham').attr("src", Imagedata[0]);
            console.log(data);
            $('#maTour').val(data[0]);
            $('#tenTour').val(data[1]);
            $('#hinhAnh').val(data[2]);
            $('#soNgay').val(data[3]);
            $('#soNguoi').val(data[4]);
            $('#giaTour').val(data[5]);
            $('#ngayXuatPhat').val(data[7]);
            $('#gioiThieuTour').val(data[8]);
        });
    });

}
//----------------------------------------------------------------

// Get list Products
//----------------------------------------------------------------
getAllListProduct();

function getAllListProduct() {
    getAllProduct(renderProducts);
}

function getAllProduct(callback) {
    fetch('http://localhost:8090/getAllListProduct')
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderProducts(Products) {
    var arrProduct = [];
    Products.map(function(Product) {
        arrProduct.push(Product);
    });
    var table = document.getElementById('list-products');
    for (var i = 0; i < arrProduct.length; i++) {
        var row = `<tr class="item">
                    <td>${arrProduct[i].maSanPham}</td>        
                    <td>${arrProduct[i].tenSanPham}</td>
                    <td style="width: 25%;hieght:50%" ><img src="${arrProduct[i].hinhAnh}" style="hight: 25px;height: 52px;"></td>
                    <td>${arrProduct[i].soLuongHienTai}</td>
                    <td>Còn hàng</td>
                    <td>${arrProduct[i].giaSanPham}</td>
                    <td 
                class="table-td-center">
                <button class="btn btn-sm editbtn btn-primary" type="button" title="Sửa" id="show-emp" data-toggle="modal"
                data-target="#ModalUP"><i class="fas fa-edit"></i>
            </button>

                    <button class="btn btn-primary btn-sm" type="button" title="ẩn"
                        onclick=""><i class="fas fa-eye-slash"></i>
                    </button>
                   
                    <button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                        onclick=""><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
                </tr>`
        table.innerHTML += row;
    }

    $(document).ready(function() {
        $('.editbtn').on('click', function() {

            $('#ModalUP').modal('show');
            $tr = $(this).closest('tr');
            var data = $tr.children("td").map(function() {
                return $(this).text();
            }).get();

            var Imagedata = [];
            Imagedata.push($tr.find('img').attr('src'))

            data[2] = Imagedata[0];
            //$('#anhSanPham').attr("src", Imagedata[0]);
            console.log(data[0]);
            $('#anhSanPham').val(data[2]);
            $('#maSanPham').val(data[0]);
            $('#tenSanPham').val(data[1]);
            $('#soLuongSanPham').val(data[3]);
            $('#giaSanPham').val(data[5]);
        });
    });
}





//----------------------------------------------------------------

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:8090/addProduct', options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);

    //----------------------------------------------------------------
}

function handleCreateProduct() {
    var createBtn = document.querySelector('#createProduct');
    createBtn.onclick = function() {
        var tenSanPham = document.querySelector('input[name="tenSanPham"]').value;
        var soLuong = document.querySelector('input[name=soLuong]').value;
        var giaSanPham = document.querySelector('input[name="giaSanPham"]').value;
        var hinhAnh = document.querySelector('input[name="hinhAnh"]').value;

        var formData = {
            tenSanPham: tenSanPham,
            soLuongHienTai: parseInt(soLuong),
            giaSanPham: giaSanPham,
            hinhAnh: hinhAnh,
        };
        console.log(formData);
        createProduct(formData);
    };
}
//----------------------------------------------------------------

// Update sản phẩm
//----------------------------------------------------------------

function updateProduct(data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:8090/putProduct', options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleUpdateProduct() {
    var updateBtn = document.querySelector('#updateProduct');
    updateBtn.onclick = function() {
        var maSanPham = document.querySelector('input[name="maSanPham"]').value;
        var tenSanPham = document.querySelector('input[name="tenSanPham"]').value;
        var soLuong = document.querySelector('input[name=soLuongSanPham]').value;
        var giaSanPham = document.querySelector('input[name="giaSanPham"]').value;
        var hinhAnh = document.querySelector('input[name="anhSanPham"]').value;

        var formData = {
            maSanPham: parseInt(maSanPham),
            tenSanPham: tenSanPham,
            soLuongHienTai: parseInt(soLuong),
            giaSanPham: giaSanPham,
            hinhAnh: hinhAnh,
        };
        console.log(formData);
        updateProduct(formData);
        window.open("table-data-product.html");
    };
}
//----------------------------------------------------------------

// // Update sản phẩm
// //----------------------------------------------------------------

function updateTour(data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:8090/putTour', options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleUpdateProduct() {
    var updateBtn = document.querySelector('#updateTour');
    updateBtn.onclick = function() {
        var maSanPham = document.querySelector('input[name="maTour"]').value;
        var tenSanPham = document.querySelector('input[name="tenSanPham"]').value;
        var soLuong = document.querySelector('input[name=soLuongSanPham]').value;
        var giaSanPham = document.querySelector('input[name="giaSanPham"]').value;
        var hinhAnh = document.querySelector('input[name="anhSanPham"]').value;

        var formData = {
            maSanPham: parseInt(maSanPham),
            tenSanPham: tenSanPham,
            soLuongHienTai: parseInt(soLuong),
            giaSanPham: giaSanPham,
            hinhAnh: hinhAnh,
        };
        console.log(formData);
        updateProduct(formData);
        window.open("table-data-product.html");
    };
}
//----------------------------------------------------------------

// lấy tour đã đặt
getAllTourOrdered();

function getAllTourOrdered() {
    getTourOrdered(renderTourOrdered);
}

function getTourOrdered(callback) {
    fetch('http://localhost:8090/getTourByAll')
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderTourOrdered(Tours) {
    var arrTourOrders = [];
    Tours.map(function(tour) {
        arrTourOrders.push(tour);
    });
    var table = document.getElementById('list-tour-ordereds');
    for (var i = 0; i < arrTourOrders.length; i++) {
        var row = `<tr class="item">
                    <td>${arrTourOrders[i].maPhieuDatTour}</td>        
                    <td>${arrTourOrders[i].hoTenKhach}</td>
                    <td> ${arrTourOrders[i].tenTour}</td>
                    <td>${arrTourOrders[i].soLuongNguoi}</td>
                    <td>${(arrTourOrders[i].ngayDangKyPhieuDatTour).substring(0,10)}</td>
                    
                    <td>${(arrTourOrders[i].ngayXuatPhat).substring(0,10)}</td>
                    <td>${arrTourOrders[i].tenDiaDiemXuatPhat}</td>
                    <td>${arrTourOrders[i].TongTien}</td>
                </tr>`
        table.innerHTML += row;

    }
}

//----------------------------------------------------------------


// // Thêm tour
// handleCreateTour()

// function handleCreateTour() {
//     var createBtn = document.querySelector('#createTour');
//     console.log(createBtn);
//     createBtn.onclick = function() {};
// }

function funSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("sampleTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}