//date
function getFormattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
}

//dashboard data load
const dashboardDataLoad = () => {
    firestore
        .collection('products')
        .get()
        .then((res) => {
            let totalAmount = 0;
            res.forEach((doc) => {
                const data = doc.data();
                totalAmount = totalAmount + data.price * data.qty;
            });
            $('#productCount').html(res.size);
            $('#inventryVal').html(totalAmount);
        })
        .catch((error) => {
            console.log(error);
        });

    const today = getFormattedDate();

    firestore
        .collection('totals')
        .where('date', '==', today)
        .get()
        .then((querySnapshot) => {
            let totalAmount = 0;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const total = parseInt(data.total, 10); // Convert the string to an integer
          
                if (!isNaN(total)) {
                  totalAmount += total;
                }
              });
            $('#totalSelling').html(totalAmount);
        })
        .catch((error) => {
            console.log(error);
        });
}

//product add to billing
const addProductToBilling = (val) => {
    // $('#billingSection').load(location.href + ' #billingSection');

    firestore
        .collection('products')
        .doc(val)
        .get()
        .then((res) => {
            if (res.exists) {
                const data = res.data();
                $('#dashProductName').html(data.name);
                $('#dashProductPrice').html(data.price);
                $('#dashProductUnits').html(" (" + data.unit + "" + data.uprice + ")");
                $('#dashProductQty').html(data.qty);
                $('#billingQty').attr('max', data.qty);
                $('#dashProductTotalPrice').html(data.price);
            } else {
                alert("invalied data ")
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

//set Total Amount - Product
const setTotalAmountInProduct = (val) => {
    const price = $('#dashProductPrice').html();
    const total = price * val;
    $('#dashProductTotalPrice').html(total);
}

//add to cart
const addCart = () => {
    const proid = $('#productSelect').val();

    if (proid != null) {
        tempCartItems = {
            id: proid,
            name: $('#dashProductName').html(),
            price: $('#dashProductPrice').html(),
            qty: $('#billingQty').val(),
            total: $('#dashProductTotalPrice').html(),

        }

        //add data into cart
        firestore
            .collection('carts')
            .add(tempCartItems)
            .then((res) => {
                alert("Product is added cart");
            })
            .catch((err) => {
                console.log(err)
            });

        //qty update
        const avlblQty = $('#dashProductQty').html();
        const billQty = $('#billingQty').val()
        const remaining = avlblQty - billQty;

        firestore
            .collection('products')
            .doc(proid)
            .update({ qty: remaining })
            .then((res) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err)
            });

    } else {
        alert("Select Product")
    }
}

//load cart table
const loadCartTable = () => {
    $('#cartTable').load(location.href + ' #cartTable');

    firestore
        .collection('carts')
        .get()
        .then((res) => {
            let totalAmount = 0;
            let tbid = 1;
            res.forEach((doc) => {
                const data = doc.data();
                //cat totale amount count
                totalAmount = totalAmount + data.price * data.qty;

                //table data load
                row = `
                    <tr>
                        <td>${tbid++}</td>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.qty}</td>
                        <td>${data.total}</td>
                    </tr>
                    `;

                $('#cartTableBody').append(row)
            });
            lastrow = `
                     <tr class="text-end ">
                         <td colspan="5" class="fw-bold text-end py-3">Total Amount: Rs <span id="tableCartTotal">${totalAmount}</span>/=</td>
                     </tr>
                     `;
            $('#cartTableBody').append(lastrow)

        })
        .catch((error) => {
            console.log(error);
        });
}

//date
function getFormattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
}

// Function to trigger the print
function printBillingSection() {
    const printContents = document.getElementById("billingSectiontable").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.onafterprint = function () {
        // This function will be called after print or cancel
        document.body.innerHTML = originalContents;
        totalSelling();
        clearCartTable();
        //location.reload();
    };

    window.print();
    document.body.innerHTML = originalContents;
}

//print invoice
const printCart = () => {
    printBillingSection();
}

//total selling add
const totalSelling = () => {
    const total = $('#tableCartTotal').html();

        firestore
        .collection('totals')
        .add({ date: getFormattedDate(), total: total })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err)
        });

}

const clearCartTable = () => {
    firestore
        .collection('carts')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                deleteCratData(doc.id)
            });
            setTimeout(function() {
                alert("Proccess is done !")
                location.reload();
            }, 3000);
        })
        .catch((err) => {
            console.log(err);
        });
}


const deleteCratData = (id)=>{
    firestore
    .collection('carts')
    .doc(id)
    .delete()
    .then(() => {
    })
    .catch((err) => {
        console.log(err);
    });
}

