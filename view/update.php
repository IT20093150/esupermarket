<?php
$title = "Product";
require('./header.php');
?>

<div class="d-flex flex-row justify-content-between align-items-center">
    <h1 class="fw-bold fs-2 m-3 text-center"><span>Update / Delete</span> Product Details </h1>
</div>

<div class="d-flex flex-row justify-content-center align-items-center">
    <!-- student select -->
    <div class="d-flex flex-column w-75 my-3">
        <label for="">Select product name / id</label>
        <select class="form-select rounded-pill text-center" id="productSelect" onchange="productIdForUpdate(this.value)">
            <option value="" selected disabled>---Select product---</option>
        </select>
    </div>
</div>

<div class="d-flex flex-column flex-md-row my-3 align-items-center">
    <div class="row col-12">

        <!-- product images -->
        <div class="col-12 col-md-4 mx-auto ">
            <div class="row mx-auto">
                <div class="col-12 d-flex justify-content-center mx-auto">
                    <img src="../src/img/no-image.png" class="bg-transparent w-75 img-thumbnail border-0 " id="addProduct-img">
                </div>
            </div>

            <!-- image select -->
            <div class="row my-2 ">
                <div class="col-12 mt-1 text-center">
                    <input type="file" class="d-none" accept=".jpg, .jpeg, .png" id="addProduct_imageSelect">
                    <label for="addProduct_imageSelect" class="w-75 btn py-2 btn-dark col-12  rounded-0" onclick="addProductimage()">Add Image</label>
                </div>
            </div>
        </div>

        <!-- product data form -->
        <div class="col-12 col-md-8 d-flex flex-column">

            <!-- form -->
            <div class="d-flex flex-column">

                <!-- name -->
                <div class="d-flex flex-column flex-md-row justify-content-between my-1">
                    <div class="d-flex flex-column w-100 me-1">
                        <label for="">Product name<span class="text-danger ms-1 fw-bold">*</span></label>
                        <input type="text" class="rounded-pill form-control py-2" id="productName">
                    </div>
                </div>

                <!-- price -->
                <div class="d-flex flex-column w-100 my-1">
                    <label for="">Price<span class="text-danger ms-1 fw-bold">*</span></label>
                    <input type="text" class="rounded-pill form-control py-2" id="productPrice">
                </div>

                <!-- qty -->
                <div class="d-flex flex-column flex-md-row justify-content-between my-1">
                    <div class="d-flex flex-column w-75 me-1">
                        <label for="">QTY<span class="text-danger ms-1 fw-bold">*</span></label>
                        <input type="text" class="rounded-pill form-control py-2" id="productQty">
                    </div>
                </div>

                <!-- unit of the price select -->
                <div class="d-flex flex-column flex-md-row my-2">
                    <div class="d-flex flex-column w-100 my-1">
                        <label for="">The unit of the price<span class="text-danger ms-1 fw-bold">*</span></label>
                        <input type="text" class="rounded-pill form-control py-2" id="productUnitPrice">
                    </div>

                    <div class="d-flex flex-column w-100 my-1">
                        <label for="">Unit<span class="text-danger ms-1 fw-bold">*</span></label>
                        <select class="form-select rounded-pill text-center" id="productUnit">
                            <option value="" selected disabled>---Select Unit---</option>
                        </select>
                    </div>
                </div>

                <!-- update/delete product btn -->
                <div class="col-12 mx-auto d-flex flex-column justify-content-center my-3" id="productUDbtnSection">
                    <button class="btn btn-lg btn-dark rounded-pill mx-5 px-3 my-2" onclick=" UpdateProduct()">Update Product</button>
                    <button class="btn btn-lg btn-danger rounded-pill mx-5 px-3 my-2" onclick="deleteProduct()">Delete Product</button>
                </div>

                <div class="col-12 spinnerDiv d-none" id="spin">
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
<script>
    window.onload = function() {
        //load the units
        loadsUnits();

        //load product
        loadsProduct();
    };
</script>


<?php
require('./footer.php');
?>