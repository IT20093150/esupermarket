//custome email varification
function isEmailValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

//custome password varification
function isPasswordValid(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
}

//sign in
const userSignIn = ()=>{
    const email = $('#userName').val();
    const pass = $('#userPassword').val();

    // Perform validation
    if (!isEmailValid(email)) {
        alert("Username is invalid. It should be at least 4 characters long and contain only letters and numbers.");
    } else if (!isPasswordValid(pass)) {
        alert("Password is invalid. It should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    } else {
        firebase
        .auth()
        .signInWithEmailAndPassword(email,pass)
        .then((resp)=>{
            console.log(resp);
            console.log(resp.user);
            window.location.replace('./dashboard.php');
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}

//sign out
const userSignOut = ()=>{
    firebase
    .auth()
    .signOut()
    .then(function() {
        alert("User has been successfully logged out.");
        window.location.href = "./index.php";
    })
    .catch(function(error) {
        console.error("Error while logging out:", error);
    });
}

//auth checking
firebase.auth().onAuthStateChanged((user) => {
    (!user && window.location.pathname !== "/view/index.php")? 
        window.location.href = "./index.php": "";
});


