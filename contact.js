// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCslTRvFbFQEWHWWqhcGDtVIQprRLhuhwg",
  authDomain: "contactform-9f855.firebaseapp.com",
  databaseURL: "https://contactform-9f855.firebaseio.com",
  projectId: "contactform-9f855",
  storageBucket: "contactform-9f855.appspot.com",
  messagingSenderId: "918725644820",
  appId: "1:918725644820:web:5d31c7f54a0763b0648d01",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference messages collection
let messagesRef = firebase.database().ref("messages");

//Event Listener for submitting form
let form = document.getElementById("contactForm");

form.addEventListener("submit", submitForm);

//Submit form
function submitForm(event) {
  event.preventDefault();

  //Get Values
  let name = getInputVal("name");
  let email = getInputVal("email");
  let phone = getInputVal("phone");
  let message = getInputVal("message");

  //Save message
  saveMessage(name, email, phone, message);

  //show alert
  document.querySelector(".alert").style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //clear form
  form.reset();
}

//function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(name, email, phone, message) {
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
}
