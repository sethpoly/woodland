// ON AUTH STATE CHANGE
//    firebase.auth().onAuthStateChanged(function(user) {
//    if (user) {
//        console.log('user signed in');
//
//        // Navigate to main html page
//        window.location.href = 'index.html';
//    } else {
//      // No user is signed in.
//        console.log('user not signed in');
//        //document.getElementById('logOutBtn').style.display = 'none';
//    }
//    });



// SIGN-UP RECOMMENDATION BUTTON
// Display the register popup and hide the login popup
document.getElementById('registerHrefBtn').addEventListener('click', function() {
    var registerPopup = document.getElementById('registerContainer');
    
    // Hide login popup
    document.getElementById('loginContainer').style.display = 'none';
    
    // Display register popup
    registerPopup.style.display = 'block';
})

// SIGN-IN RECOMMENDATION BUTTON
// Display the login popup and hide the register popup
document.getElementById('loginHrefBtn').addEventListener('click', function() {
        
    // Hide register popup
    document.getElementById('registerContainer').style.display = 'none';
    
    // Display login popup
    document.getElementById('loginContainer').style.display = 'block';
})

// REGISTER FORM
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve inputted register details
    let username = document.getElementById('registerUsername').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let answer = document.getElementById('registerQuestion').value;
    
    // Create the new account using email/password
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    
    // Register successful
    console.log(user + " successfully registered");
    
    // Navigate to main html page
    window.location.href = 'home.html'; 
        
    }).catch(function(error) {
        console.log(error.message);
    });
    

})

// LOGIN FORM
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve inputted register details
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // Sign in using email/password
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    
    // Sign in successful
    console.log('Sign in successful'); 
        
    // Navigate to main html page
    window.location.href = 'home.html'; 
        
}).catch(function(error) {
        console.log(error.message);
        console.log('Invalid email or password');
    });
})