<?php
$title = "DashBoard";
require('./header.php');
?>

<div class="col-12 mb-1 mt-1">
    <div class="row">
        <div class="col-12 col-lg-4 p-4 bg-warning border border-1 border-warning rounded ">
            <div class="row">
                <div class="col-12 font-weight-bold h4 text-light"><i class="bi bi-gear-wide-connected"></i> &nbsp; Total Products : <span id="productCount"></span></div>
            </div>
        </div>

        <div class="col-12 col-lg-4 p-4 bg-success border border-1 border-success rounded">
            <div class="row">
                <div class="col-12 font-weight-bold h4 text-dark"><i class="bi bi-bookmarks"></i> &nbsp; Total selling : Rs<span id="totalSelling"></span></div>
            </div>
        </div>

        <div class="col-12 col-lg-4 p-4 bg-danger border border-1 border-danger rounded">
            <div class="row">
                <div class="col-12 font-weight-bold h4 text-dark"><i class="bi bi-journal"></i> &nbsp; Inventry value : Rs<span id="inventryVal"></span></div>
            </div>
        </div>
    </div>
</div>

<div class="col-12 mx-auto mt-3 p-4 bg-white">
    <div class="row">
        <div class="col-12 col-lg-6">
            <div class="d-flex flex-column w-100 my-1">
                <select class="form-select rounded-pill text-center" id="productSelect" onchange="addProductToBilling(this.value)">
                    <option value="" selected disabled>---Select Product---</option>
                </select>
            </div>

            <div class="d-flex flex-row justify-content-between align-items-center w-100 my-3" id="billingSection">
                <div class="fw-bold">
                    <p>product name : <span id="dashProductName"></span></p>
                    <p>product price : Rs <span id="dashProductPrice"></span><span id="dashProductUnits"></span></p>

                    <br>
                    <h3>Total Amount : Rs <span id="dashProductTotalPrice"></span> /=</h3>
                </div>

                <div>
                    <label for="">Available Qty<span class="text-danger ms-1 fw-bold" id="dashProductQty"></span></label>
                    <input type="number" min="1" value="1" class="text-center rounded-pill w-100 form-control py-2" id="billingQty" onchange="setTotalAmountInProduct(this.value)">
                    <button class="btn btn-primary float-end mt-2" onclick="addCart()">add</button>
                </div>
            </div>
        </div>


        <div class="col-12 col-lg-6" id="billingSectiontable">
            <h2 class="text-center text-secondary">SUMMERY</h2>
            <p class="text-center">eSuperMarket</p>

            <table class="table table-striped" id="cartTable">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody id="cartTableBody">
                </tbody>
            </table>
        </div>

        <div>
            <button class="btn btn-primary w-25 float-end mt-2" onclick="printCart()">Print invoice</button>
        </div>

    </div>
</div>


<script>
    window.onload = function() {
        //load the units
        loadsProduct();

        //productCount
        dashboardDataLoad();

        //cart data load
        loadCartTable();
    };
</script>

<?php
require('./footer.php');
?>