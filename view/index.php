<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-SuperMarket Loging page</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">


    <style>
        .signin-bg-img {
            background-image: url("../src/img/signinBg.jpg");
            background-repeat: no-repeat;
            background-size: cover;

        }

        .signin-bg {
            background-color: rgb(211, 211, 211, 0.4);
            height: 100vh;
            width: auto;
        }
    </style>

</head>

<body>
    <div class="container-fluid signin-bg-img">
        <div class="d-flex flex-row flex-lg-column ">
            <div class="row">
                <div class="col-12 col-md-3 signin-bg my-auto float-end">
                    <!-- logo -->
                    <div class="d-flex align-items-center justify-content-center flex-column mt-5 logo">
                        <h1 class="fw-bold">E-SUPERMARKET</h1>
                        <br>
                        <h2 class="fw-bold">SIGNIN</h2>
                    </div>

                    <!-- login -->
                    <div class="mx-4 my-auto" style="transform: translateY(10%);">
                        <div class="d-flex flex-column my-3">
                            <label for="userName">User name</label>
                            <input type="text" class="rounded-pill form-control py-2" id="userName" >
                        </div>

                        <div class="d-flex flex-column my-3">
                            <label for="userPassword">User Password</label>
                            <input type="password" class="rounded-pill form-control py-2" id="userPassword">
                        </div>

                        <div class="text-center ">
                            <button type="button" class="btn btn-dark px-5 mt-3" onclick="userSignIn()">Login</button>
                        </div>
                    </div>

                    <div class="col-12 col-lg-4 text-dark text-center fixed-bottom">
                        Copyright &copy; <script>
                            document.write(new Date().getFullYear());
                        </script> All Rights Recerved
                    </div>

                </div>
            </div>
        </div>
    </div>

<?php
    require('./footer.php');
?>

</body>
</html>