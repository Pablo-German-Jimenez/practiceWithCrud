import Contact from "./contacts.js";
import { validateAmountCaracters } from "./validations.js";

const btnModal = document.getElementById("btnModal"); // PRIMERO click en id="btnModal"

const modal = new bootstrap.Modal(
  document.getElementById("addContactModalLabel") // SEGUNDO elemento seleccionado para mostrarse en window
);

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
const hobbies = document.getElementById("talents");
const superpoder = document.getElementById("superpowers");
const tablaContactoBody = document.getElementById("tablaContactoBody");
let buildingContact = true;
let idContact = null;

const agenda = JSON.parse(localStorage.getItem("agenda")) || []; // si no hay nada en local storage, crea un array vacio

//add contacts to table
//if agenda has contacts, draw them in table
const cargarContactos = (id) => {
  if (agenda.length !== 0) {
    agenda.map((itemContacto, id) => dibujarFilas(itemContacto, id + 1));
  }
  
};

//draw rows in table
const dibujarFilas = (itemContacto, id) => {
  tablaContactoBody.innerHTML += `
   <tr>
            <th scope="row">${id}</th>
            <td>${itemContacto.name}</td>
            <td>${itemContacto.surname}</td>
            <td>${itemContacto.phone}</td>
            <td>${itemContacto.email}</td>
            <td>
            <img
              src=${itemContacto.img}
              alt=${itemContacto.name}
               >
            </td>
            <td ><div class="btn-group  " role="group" aria-label="Basic mixed styles example" >
  <button type="button" class="btn btn-danger my-1 mx-1"><i class="bi bi-trash" onClick="deleteContact('${itemContacto.id}')"></i></button>
  <button type="button" class="btn btn-warning my-1 mx-1"><i class="bi bi-pencil-square" onClick="prepareContact('${itemContacto.id}')"></i></button>
  <button type="button" class="btn btn-primary my-1 mx-1"><i class="bi bi-eye "></i></button>
</div></td>
            
          </tr>`;
};

//json save to local storage
const saveLocalStorage = () => {
  localStorage.setItem("agenda", JSON.stringify(agenda));
};

//function create contact
const createContact = () => {
  //search data of form and create a object contact
  if(validations()){

  const contactNew = new Contact(
    name.value,
    surname.value,
    phone.value,
    email.value,
    img.value.length !== 0
      ? img.value
      : `https://i.pinimg.com/1200x/29/97/81/299781432e565934aa4c8943cae829fb.jpg`,
    company.value,
    jobtitle.value,
    address.value,
    notes.value,
    hobbies.value,
    superpoder.value
  );
  //method push to array named agenda the contactNew values
  agenda.push(contactNew);
  //save to local storage
  saveLocalStorage();
  Swal.fire({
    title: "Contact created!",
    text: `The contact ${name.value} has been created successfully.`,
    icon: "success",
    confirmButtonText: "Ok",
  });
  formContact.reset();
  dibujarFilas(contactNew, agenda.length);
  }else {
   console.log(`There are errors without valid!`)
  }
};
// function delete contact
window.deleteContact = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui agrego la logica para borrar
      //tengo que buscar en que posicion esta el contacto
      const indexContact = agenda.findIndex((contact) => contact.id === id);
      console.log(indexContact);

      //con splice borramos el elemento de  determinada posicion del array
      agenda.splice(indexContact, 1);

      //actualizo el local storage
      //tablaContactoBody.innerHTML = ""; //limpio todo el tbody y sus hijos
      //cargarContactos(); //vuelvo a cargar los contactos

      tablaContactoBody.children[indexContact].remove(); //limpio el tbody
      // actualizar el numero de filas
      //for (let i = indexContact; i < tablaContactoBody.children.length; i++)
      saveLocalStorage();

      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
      });
    }
  });
};

//function edit contact
window.prepareContact = (id) => {
  //TODO update title of form add contact to edit title
  const contactEdit = agenda.find((contact) => contact.id === id);

  name.value = contactEdit.name;
  surname.value = contactEdit.surname;
  phone.value = contactEdit.phone;
  email.value = contactEdit.email;
  img.value = contactEdit.img;
  company.value = contactEdit.company;
  jobtitle.value = contactEdit.jobtitle;
  address.value = contactEdit.address;
  notes.value = contactEdit.notes;
  hobbies.value = contactEdit.hobbies;
  superpoder.value = contactEdit.superpoder;
  idContact = id;
  buildingContact = false; // TODO set the flag to indicate that we are editing an existing contact

  modal.show();
  editContact(idContact); // call the editContact function with the id of the contact to be edited
};

const editContact = () => {
  const contactEdit = agenda.findIndex((contact) => contact.id === idContact);
  if (contactEdit !== -1) {
    //modificar contacto
    agenda[contactEdit].name = name.value;
    agenda[contactEdit].surname = surname.value;
    agenda[contactEdit].phone = phone.value;
    agenda[contactEdit].email = email.value;
    agenda[contactEdit].img = img.value;
    agenda[contactEdit].company = company.value;
    agenda[contactEdit].jobtitle = jobtitle.value;
    agenda[contactEdit].address = address.value;
    agenda[contactEdit].notes = notes.value;
    agenda[contactEdit].hobbies = hobbies.value;
    agenda[contactEdit].superpoder = superpoder.value;
    //update localstorage
    saveLocalStorage();
    //todo actualizar fila indice de la tabla en tiempo real
    const filaEditada = tablaContactoBody.children[contactEdit];
    if (filaEditada) {
      //del tr accedo a los td
      filaEditada.childNodes[2].textContent = agenda[contactEdit].name;
      filaEditada.children[2].textContent = agenda[contactEdit].surname;
      filaEditada.children[5].children[0].src = agenda[contactEdit].img;
    }
    modal.hide();
    //todo mostrar sweet alert contacto actualizado
  }
};
//validations
const validations = () => {
  let validatedData  = true
  if(!validateAmountCaracters(name,2,50)){
    validatedData = false
  }
  return validatedData;
};

//event handlers

btnModal.addEventListener("click", () => {
  formContact.reset();
  buildingContact = true; // reset the flag to indicate a new contact is being built
  modal.show();
}); // TERCERO escucha click en btnModal y muestra el contenido del modal tomado desde el dom por id por addContactModalLabel y muestra contenido div

const formContact = document.querySelector("#addContactForm");
formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  if (buildingContact) {
    // if buildingContact is true, create a new contact
    createContact();
  } else {
    editContact(); // if buildingContact is false, edit the existing contact
  }
});
cargarContactos();
