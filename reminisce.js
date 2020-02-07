// Close modal button
var closeModal = document.getElementById('close-btn');
   
// Get the modal
var modal = document.getElementById("myModal"); 

// Close the modal 
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Copy unique jar ID 
function copy() {
  
    var copyText = document.getElementById("text-jar-id");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}


// USER CLICKS A GROUP
// Change color of group item
// Change content of groupInfoDiv
document.getElementById('groupList').addEventListener('click', function(e) {
    var items = document.querySelectorAll(".groupItem")
    
    // Remove highlight from all other items
    for(var i = 0; i < items.length; i++){
        items[i].classList.remove('highlight');
    }

    if(e.target && e.target.nodeName == 'LI') {
        console.log(e.target.value);
        
        // Change color of group item
        e.target.classList.add('highlight');
    }
});

// ADD A MEMORY JAR
// DISPLAYS FITST MODAL
function addJar() {
    // Display modal
     modal.style.display = "block";
}

// Go to FIRST MODAL
function backModal() {
   // Get modal container and refill it with "First modal" html
    var container = document.getElementById('modal-content');
    
    // The first modal (choice: create or join)
    container.innerHTML = "<div id='modal-body'><div class='modalCreate'><h3 class='choiceHeader'>Create</h3><p class='subChoiceHeader'>Create a new jar and start filling it with memories.</p><img  class='img' src='jar.png'><input id='create-jar-btn' class='choiceButton' type='button' value='Create a jar' onclick='createJarModal()'></div><div class='modalJoin'><h3 class='choiceHeader'>Join</h3><p class='subChoiceHeader'>Enter a jar invite and start adding memories to a friend's jar.</p><img  class='img' src='jar.png'><input id='join-jar-btn' class='choiceButton' type='button' value='Join a jar'> </div></div>"; 
}

// CREATE JAR BTN
// SHOWS NEXT MODAL
function createJarModal() {
    // Get modal container and refill it with "Type title" html
    var container = document.getElementById('modal-content');
    
    // The create modal (jar title)
    container.innerHTML = "<div id='modal-body'><span id='close-btn'>&times;</span><h2 class='fullHeader'>Create a jar</h2><p class='subDescription'>Name your jar, share your jar with friends, and start adding memories together!</p><h4 class='smallHeader'>JAR NAME</h4><input class='jarInput' id='jarTitleInput'type='text' placeholder='Enter a jar name'><img class='modal-img' src='jar.png'></div><div class='modal-footer'><input class='footer-btn' id='footer-back-btn' type='button' onclick='backModal()' value='BACK'><input class='footer-btn' id='footer-next-btn' type='button' value='Create'></div></div>";
}

// JOIN JAR BTN
// SHOWS NEXT MODAL
function joinJarModal() {
    // Get modal container and refill it with "Type title" html
    var container = document.getElementById('modal-content');
    
    container.innerHTML = "";
}
