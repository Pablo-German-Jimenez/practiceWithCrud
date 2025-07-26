import Contact from "./contacts.js";

const btnModal = document.getElementById("btnModal");

const modal = new bootstrap.Modal(
  document.getElementById("addContactModalLabel")
);

btnModal.addEventListener("click", () => {
  modal.show();
});
const name = document.getElementById("name");
const surname = document.getElementById("lastname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const img = document.getElementById("img");
const company = document.getElementById("company");
const jobtitle = document.getElementById("jobtitle");
const address = document.getElementById("address");
const notes = document.getElementById("notes");
const hobbies = document.getElementById("hobbies");
const superpoder = document.getElementById("superpoder");
const agenda = [];

//json
const saveLocalStorage=() => {
  localStorage.setItem("agenda", JSON.stringify(agenda));
}


//function create contact
const createContact = () => {
  //search data of form and create a object contact
  const contactNew = new Contact(
    name.value,
    surname.value,
    phone.value,
    email.value,
    img.value,
    company.value,
    jobtitle.value,
    address.value,
    notes.value,
    hobbies.value,
    superpoder.value
  );
  agenda.push(contactNew);
  console.log(contactNew);
  saveLocalStorage();
  //save the contact in agenda contacts
  //save the agenda in localStorage
};

//event handlers
const formContact = document.querySelector("#addContactForm");
formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  createContact();
});
