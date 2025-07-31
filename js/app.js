import Contact from "./contacts.js";


const btnModal = document.getElementById("btnModal"); // PRIMERO click en id="btnModal"

const modal = new bootstrap.Modal(
  document.getElementById("addContactModalLabel") // SEGUNDO elemento seleccionado para mostrarse en window
);

btnModal.addEventListener("click", () => {
  modal.show();
}); // TERCERO escucha click en btnModal y muestra el contenido del modal tomado desde el dom por id por addContactModalLabel y muestra contenido div

//DOM's elements
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

const agenda = JSON.parse(localStorage.getItem("agenda")) || []; // si no hay nada en local storage, crea un array vacio

//json save to local storage
const saveLocalStorage = () => {
  localStorage.setItem("agenda", JSON.stringify(agenda));
};

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
  Swal.fire({
  title: 'Contact created!',
  text: `The contact ${name.value} has been created successfully.`,
  icon: 'success',
  confirmButtonText: 'Ok'
})
};

//event handlers
const formContact = document.querySelector("#addContactForm");
formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  createContact();
  formContact.reset();
});
