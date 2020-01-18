// Current category selected
var currentCategoryKey;
var currentCategoryName;

// Run whenever page is loaded
window.addEventListener('load', function() {
    
    // Load categories
    getCategories();
})

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
    document.getElementById('loginNav').value = "SIGN OUT";
    
    // Change login onClick event
    document.getElementById('loginNav').setAttribute( "onClick", "logOut()" );
} else {
  // No user is signed in.
    console.log('user not signed in');
    document.getElementById('loginNav').value = 'LOG IN';
    
    // Change login onClick event to sign in page
    document.getElementById('loginNav').setAttribute( "onClick", "loginPage()" );
}
});

/* Set the width of the side navigation to 250px */
function openNav() {
    
    var mq = window.matchMedia( "(max-width: 570px)" );
    
    if(mq.matches) {
      document.getElementById("categoryContainer").style.width = "200px";
    } else {
      document.getElementById("categoryContainer").style.width = "250px";
//      document.getElementById("main").style.marginLeft = "250px";
    }
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("categoryContainer").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
} 

// Closes register
function closeRegister() {
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'none';
}



// SIGN-IN NAV BUTTON
// Go to login html page
//document.getElementById('loginNav').addEventListener('click', function() {
//    
//    
//    
////    var loginScreen = document.getElementById('loginContainer');
////
////    // Hide register screen
////    document.getElementById('registerContainer').style.display = 'none';
////    // Display log-in popup if not displayed
////    if(loginScreen.style.display == 'none' || loginScreen.style.display == "") {
////        loginScreen.style.display = 'block';
////    } else {
////        loginScreen.style.display = 'none';
////    }
//})



// LOGOUT BUTTON
document.getElementById('logOutBtn').addEventListener('click', function() {
  firebase.auth().signOut();
  console.log('logged out')
})

// Executes when user adds a new category & hits submit button
document.getElementById("addCatForm").addEventListener("submit", function(e) {
     e.preventDefault();
    
    // User input
    var value = document.getElementById("addCatInput").value;
    
    // Reference endpoint
    var endpoint = firebase.database().ref("/Categories");
    
    // Add value to endpoint
    endpoint.push({
        "Name":value
    });
    
    // Clear form
    this.reset();
    
    // Load categories
    getCategories();
})

// Executes when user clicks a category
// @param: The unique key for the category, the name of category
// Will use the key as an endpoint to add and fetch data from that category
function clickedCat(key, name) {
    console.log(key);
    
    
    // Change header to current catgeory
    document.getElementById('categoryHeader').innerHTML = name + ' memories';
    
    // Show newMemory box & memoryContainer
    document.getElementById("newMemory").style.display = "block";
    document.getElementById("memoryContainer").style.display = "block";
    document.getElementById("postNewMemoryHeading").style.display = "block";

    // Assign current category key/name to global variable
    currentCategoryKey = key;
    currentCategoryName = name;
    
    // Retrieve & display memories from current category endpoint
    getMemories(key, name);    
    
    
    // Close menu if user taps cat
    var mq = window.matchMedia( "(max-width: 570px)" );
    if(mq.matches) {
        closeNav();
    }
}

// NEW MEMORY FORM
// User submits new memory via form
document.getElementById("newMemoryForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Retrieve all input fields
    var title = document.getElementById("newTitle").value;
    var date = document.getElementById("newDate").value;
    var description = document.getElementById("newDescription").value;
    
    console.log(title + date + description);
    
    // Upload the memory form
    uploadMemory(title, date, description);
    
    // Clear form
    this.reset();
 })

// UPLOAD MEMORY
// Upload the inputted memory form to database to specified endpoint
// @param: title of memory, date memory happened, desc of memory
function uploadMemory(title, date, description) {
    
    // Current category endpoint
    var category = currentCategoryKey + '/' + currentCategoryName;
    
    // Reference datebase endpoint using custom category above
    var endpoint = firebase.database().ref("/Categories/" + category);
    
    // Add value to endpoint
    endpoint.push({
        "Title":title,
        "Date":date,
        "Description":description
    });
    
    //getMemories();
    
}

// Retrieves all memories from specifies endpoint (key)
// @param: the unique category key, name of category (string)
function getMemories(key, name) {
    
    // Concat curretn category endpoint
    var category = key + '/' + name;
    
    // Reference the firebase endpoint
    var myFirebase = firebase.database().ref('/Categories/' + category);
    
    // Converting json objects to an array 
    myFirebase.on("value", function(snapshot) {
        
          var arr = snapshotToArray(snapshot);
          console.log("getting memories");
          console.log(arr);
        
          // Assemble HTML for memoryContainer
          let memories = arr.map((item) => {
              return `<div class="memoryBox"><h2 class="memoryTitle">${item.Title}</h2>
                <p class="memoryDate">${item.Date}</p><p class="memoryDescription">${item.Description}</p></div>`;
          }).join('');
        
        // Visually populate html
        document.getElementById('memoryContainer').innerHTML = memories;
    });
    

    
    // Populate memoryContainer with newly created HTML
    //document.getElementById("memoryContainer").innerHTML = '<h2 id="categoryHeader">/' + name + '</h2>'
  
}

// Load all categories from database and add to html list
function getCategories() {
    
    // Reference to your entire Firebase database
    var myFirebase = firebase.database().ref('/Categories');
  
      myFirebase.on("value", function(snapshot) {
   
          // Save new array 
          var arr = snapshotToArray(snapshot);
          //console.log(arr[0].Name);

 

          
          // Map the list of categories to HTML
          let categories = arr.map((item) => {
            return `<p class="category" href="#" value="${item.Key}" onclick=clickedCat('${item.key}','${item.Name}')>/${item.Name}</p>`;
          }).join('\n');
          

          
          // Populate the category list box with mapped HTML
          document.getElementById("catList").innerHTML = categories;

    });
  }

// Converts JSON snapshot to an array
// @Return: Newly created string array
// @Params: the snapshot
function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

// Smooth scrolling
function SmoothVerticalScrolling(e, time, where) {
    var eTop = e.getBoundingClientRect().top;
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt, where);
        curTime += time / 100;
    }
}

function SVS_B(eAmt, where) {
    if(where == "center" || where == "")
        window.scrollBy(0, eAmt / 2);
    if (where == "top")
        window.scrollBy(0, eAmt);
}
 

 
