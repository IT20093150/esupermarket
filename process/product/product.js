//product data inser update delete form toggle
function crudProductdata() {

    //page topic change
    let statusElement = document.getElementById("productDataProcessType");
    let currentStatus = statusElement.innerText;
    if (currentStatus === "Add") {
        statusElement.innerText = "Update/Delete";
    } else if (currentStatus === "Update/Delete") {
        statusElement.innerText = "Add";
    }

    //change btn status
    let btnStatsElemet = document.getElementById("btnStatus");
    let currentbtnStats = btnStatsElemet.innerText;
    if (currentbtnStats === "Update") {
        btnStatsElemet.innerText = "Add";
    } else if (currentbtnStats === "Add") {
        btnStatsElemet.innerText = "Update";
    }

    //student selet tage (for update and delete)
    let productSelect = document.getElementById("selectProductForUD");
    productSelect.classList.toggle("d-none");

    //toggle CRUD btn in addstudent
    let productAddbtnSection = document.getElementById("productAddBtnSection");
    productAddbtnSection.classList.toggle("d-none");
    let productUDbtnSection = document.getElementById("productUDbtnSection");
    productUDbtnSection.classList.toggle("d-none");

}

//add product image
function addProductimage() {
    var image = document.getElementById("addProduct_imageSelect");

    image.onchange = function () {
        var file_count = image.files.length;

        for (var x = 0; x < file_count; x++) {
            var file = this.files[x];
            var url = window.URL.createObjectURL(file);
            document.getElementById("addProduct-img").src = url;
        }
    };
}

//data validation
function validateData() {
    const productName = $('#productName').val();
    const productPrice = $('#productPrice').val();
    const productQty = $('#productQty').val();
    const productUnitPrice = $('#productUnitPrice').val();
    const productUnit = $('#productUnit').val();

    if (
        !productName ||
        !productPrice ||
        !productQty ||
        !productPrice ||
        !productUnit ||
        isNaN(productPrice) ||
        isNaN(productQty) ||
        isNaN(productUnitPrice)
    ) {
        return false;
    }
    return true;
}

//product add
const addProduct = () => {
    if (validateData()) {

        //get image
        const img = document.getElementById("addProduct_imageSelect").files;
        const form = new FormData();
        for (let i = 0; i < img.length; i++) {
            const file = img[i];
            form.append('images[]', file);
        }

        var rootDir = window.location.origin;
        fetch(rootDir + '/process/product/imageprocess.pro.php', {
            method: "POST",
            body: form,
        })
            .then((response) => {
                //return response.text();
                return response.status === 200 ? response.json() : (window.location = "../view/error_page.php");
            })
            .then((data) => {
                if (data.isPost) {
                    const tempProduct = {
                        name: $('#productName').val(),
                        price: $('#productPrice').val(),
                        qty: $('#productQty').val(),
                        uprice: $('#productUnitPrice').val(),
                        unit: $('#productUnit').val(),
                        img: data.imageName,
                    };

                    //firestore
                    firestore
                        .collection('products')
                        .add(tempProduct)
                        .then((res) => {
                            alert("Product is added");
                            loadsProduct();
                            location.reload();
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else {
                    alert("Somthing went wrong ! please try again ")
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Somthing went wrong ! please try again ")
            });
    } else {
        alert("Fill The All Required fields!")
    }
}

// Set data for an update
const productIdForUpdate = (id) => {
    firestore
        .collection('products')
        .doc(id)
        .get()
        .then((res) => {
            if (res.exists) {
                const data = res.data();
                $('#productName').val(data.name);
                $('#productPrice').val(data.price);
                $('#productQty').val(data.qty);
                $('#productUnitPrice').val(data.uprice);
                $('#productUnit').val(data.unit);

                //for set img
                const imgpath = '../document/img/' + data.img;
                $('#addProduct-img').attr('src', imgpath);
            } else {
                alert("invalied data ")
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

//update product 
const UpdateProduct = () => {
    if (validateData()) {

        const img = document.getElementById("addProduct_imageSelect").files;
        if (img.length > 0) {
            const form = new FormData();
            form.append('images[]', img[0]);

            var rootDir = window.location.origin;
            fetch(rootDir + '/process/product/imageprocess.pro.php', {
                method: "POST",
                body: form,
            })
                .then((response) => {
                    //return response.text();
                    return response.status === 200 ? response.json() : (window.location = "../view/error_page.php");
                })
                .then((data) => {
                    if (data.isPost) {
                        const id = $('#productSelect').val();
                        const tempProduct = {
                            name: $('#productName').val(),
                            price: $('#productPrice').val(),
                            qty: $('#productQty').val(),
                            uprice: $('#productUnitPrice').val(),
                            unit: $('#productUnit').val(),
                            img: data.imageName,
                        };
                        dataUpOnFireBase(id, tempProduct)
                    }else{
                        alert("Somthing went wrong ! please try again ")
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const id = $('#productSelect').val();
            const tempProduct = {
                name: $('#productName').val(),
                price: $('#productPrice').val(),
                qty: $('#productQty').val(),
                uprice: $('#productUnitPrice').val(),
                unit: $('#productUnit').val(),
            };
            dataUpOnFireBase(id, tempProduct)
        }
    } else {
        alert("Fill The All Required fields!")
    }
}

function dataUpOnFireBase(id, tempProduct) {
    firestore
        .collection('products')
        .doc(id)
        .update(tempProduct)
        .then((res) => {
            alert("data is updated !")
            loadsProduct();
        })
        .catch((err) => {
            console.log(err)
        });
}

//delete product
const deleteProduct = () => {
    const id = $('#productSelect').val();

    firestore
        .collection('products')
        .doc(id)
        .delete()
        .then((res) => {
            alert("data is deleted !")
            loadsProduct();
            location.reload();
        })
        .catch((err) => {
            console.log(err)
        });
}

//load the units
const loadsUnits = () => {
    firestore
        .collection('units')
        .get()
        .then((res) => {
            var selectElement = document.getElementById('productUnit');
            selectElement.innerHTML = '<option value="" selected disabled>---Select Unit---</option>';

            res.forEach((records) => {
                const data = records.data();
                var option = document.createElement('option');
                option.value = data.unit;
                option.textContent = data.unit;
                selectElement.appendChild(option);
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

//load product
const loadsProduct = () => {
    firestore
        .collection('products')
        .get()
        .then((res) => {
            var selectElement = document.getElementById('productSelect');
            selectElement.innerHTML = '<option value="" selected disabled>---Select Product---</option>';

            res.forEach((records) => {
                const data = records.data();
                var option = document.createElement('option');
                option.value = records.id;
                option.textContent = data.name + " - " + data.price;
                selectElement.appendChild(option);
            })
        })
        .catch((err) => {
            console.log(err)
        });
}
