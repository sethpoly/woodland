/* Set the width of the side navigation to 250px */
function openNav() {
 document.getElementById("categoryContainer").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("categoryContainer").style.width = "0";
} 

// Close the about page
function closeAbout() {
    window.location.href = 'reminisce.html';
}

// GO TO LOGIN PAGE
function loginPage() {
    window.location.href = 'login.html';
    console.log('Try to login page');
}

// LOG USER OUT
function logOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
}

// ON AUTH STATE CHANGE
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    console.log('user signed in');
    
    // Change nav bar lettering
   document.getElementById('navLogin').value = "Logout";
    
    // Change login onClick event
    document.getElementById('navLogin').setAttribute( "onclick", "logOut()" );
} else {
  // No user is signed in.
    console.log('user not signed in');
    document.getElementById('navLogin').value = 'Login';
    
    // Change login onClick event to sign in page
    document.getElementById('navLogin').setAttribute( "onclick", "loginPage()" );
}
});