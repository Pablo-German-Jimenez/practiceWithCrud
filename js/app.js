import Contact from "./contacts.js";
import { validateAmountCaracters } from "./validations.js";

const btnModal = document.getElementById("btnModal"); // PRIMERO click en id="btnModal"

const modal = new bootstrap.Modal(
  document.getElementById("addcontactmodallabel") // SEGUNDO elemento seleccionado para mostrarse en window
);

//DOM's elements
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const img = document.getElementById("img");
const company = document.getElementById("company");
const jobtitle = document.getElementById("jobtitle");
const address = document.getElementById("address");
const notes = document.getElementById("notes");
const tablaContactoBody = document.getElementById("tablaContactoBody");
let buildingContact = true;
let idContact = null;
const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const agenda = JSON.parse(localStorage.getItem("agenda")) || []; // si no hay nada en local storage, crea un array vacio
const lastname = document.getElementById("lastname");
const sectionTableContacts= document.querySelector('.section-table-contacts');
console.log(sectionTableContacts)

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
   <tr >
            <th scope="row">${id}</th>
            <td>${itemContacto.name}</td>
            <td>${itemContacto.lastname}</td>
            <td>${itemContacto.phone}</td>
            <td>${itemContacto.email}</td>
            <td class="justify-content-center d-flex">
            <img class="img-thumbnail rounded-circle img-js "
              src=${itemContacto.img}
              alt=${itemContacto.name}
               >
            </td>
            <td>${itemContacto.company}</td>
            <td>${itemContacto.jobtitle}</td>
            <td>${itemContacto.address}</td>            
           <td ><div class="btn-group  " role="group" aria-label="Basic mixed styles example" >
  <button type="button" class="btn btn-danger my-1 mx-1"><i class="bi bi-trash" onClick="deleteContact('${itemContacto.id}')"></i></button>
  <button type="button" class="btn btn-warning my-1 mx-1"><i class="bi bi-pencil-square" onClick="prepareContact('${itemContacto.id}')"></i></button>
  <button type="button" class="btn btn-primary my-1 mx-1"><i class="bi bi-eye " onClick="readContact('${itemContacto.id}')"></i></button>
</div></td>
            
          </tr>`;
};

//json save to local storage
const saveLocalStorage = () => {
  localStorage.setItem("agenda", JSON.stringify(agenda));
};
//function read

window.readContact=(id)=>{

  const liItem = document.querySelector('.list-group-flush');
  const readContactIndex = agenda.find((readContact)=>readContact.id === id)
  name.value = readContactIndex.name;
  lastname.value = readContactIndex.lastname;
  phone.value = readContactIndex.phone;
  email.value = readContactIndex.email;
  img.value = readContactIndex.img;
  company.value = readContactIndex.company;
  jobtitle.value = readContactIndex.jobtitle;
  address.value = readContactIndex.address;
  notes.value = readContactIndex.notes;
  
 
  liItem.innerHTML = `
       <div class="d-flex align-items-center">
        <img src="${readContactIndex.img}" class="img-thumbnail rounded-circle me-3" width="90" height="70"
          alt="airchairBboyLinkinYoung">
        <div class="d-flex flex-column">
          <h3 class="mb-0">Bboy linkin</h3>
          <p class="text-secondary mb-0">bboy.linkin@gmail.com</p>
        </div>
        <div class="ms-auto">
          <button class="btn btn-secondary">Message</button>
        </div>
      </div>
        <li class="list-group-item">Name : ${readContactIndex.name}</li>
        <li class="list-group-item">Last Name : ${readContactIndex.lastname}</li>
        <li class="list-group-item">Phone number : ${readContactIndex.phone}</li>
        <li class="list-group-item">Job title : ${readContactIndex.email}</li>
        <li class="list-group-item">Address : ${readContactIndex.address}</li>
        <li class="list-group-item">Company : ${readContactIndex.company}</li>
           <div class="mx-3 my-3">
        <h5 class="">Notes</h5>
        <p>${readContactIndex.notes}</p>
      </div>`
 
}

//function create contact
const createContact = (id) => {
  //search data of form and create a object contact
  if (true) {
    const contactNew = new Contact(
      name.value,
      lastname.value,
      phone.value,
      email.value,
      img.value.length !== 0
        ? img.value
        : `https://i.ytimg.com/vi/C5UIozbSeyM/sddefault.jpg`,
      company.value,
      jobtitle.value,
      address.value,
      notes.value
    );
    //method push to array named agenda the contactNew values

    agenda.push(contactNew);

    //save to local storage
    saveLocalStorage();
    //d-none

    //if(sectionTableContacts.classList.contains)

    Swal.fire({
      title: "Contact created!",
      text: `The contact ${name.value} has been created successfully.`,
      icon: "success",
      confirmButtonText: "Ok",
    });
    formContact.reset();
    dibujarFilas(contactNew, agenda.length);
    
  } else {
    console.log(`There are errors without valid!`);
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
  lastname.value = contactEdit.lastname;
  phone.value = contactEdit.phone;
  email.value = contactEdit.email;
  img.value = contactEdit.img;
  company.value = contactEdit.company;
  jobtitle.value = contactEdit.jobtitle;
  address.value = contactEdit.address;
  notes.value = contactEdit.notes;

  idContact = id;
  buildingContact = false; // TODO set the flag to indicate that we are editing an existing contact

  modal.show();
  editContact(idContact); // call the editContact function with the id of the contact to be edited
};

const editContact = () => {

  const modalTitle = document.querySelector(".modal-title");
  modalTitle.textContent = `Edit Contact`;

  const contactEdit = agenda.findIndex((contact) => contact.id === idContact);
  if (contactEdit !== -1) {
    //modificar contacto
    agenda[contactEdit].name = name.value;
    agenda[contactEdit].lastname = lastname.value;
    agenda[contactEdit].phone = phone.value;
    agenda[contactEdit].email = email.value;
    agenda[contactEdit].img = img.value;
    agenda[contactEdit].company = company.value;
    agenda[contactEdit].jobtitle = jobtitle.value;
    agenda[contactEdit].address = address.value;
    agenda[contactEdit].notes = notes.value;

    //update localstorage
    saveLocalStorage();
    //todo actualizar fila indice de la tabla en tiempo real
    const filaEditada = tablaContactoBody.children[contactEdit];
    
    if (filaEditada) {
      //del tr accedo a los td
      filaEditada.children[1].textContent = agenda[contactEdit].name;
      filaEditada.children[2].textContent = agenda[contactEdit].lastname;
      filaEditada.children[3].textContent = phone.value;
      filaEditada.children[5].children[0].src = agenda[contactEdit].img;
      filaEditada.children[4].innerHTML = email.value;
      window.readContact(filaEditada)
    
      
    }
    modal.hide();
    
       Swal.fire({
      title: "Contact created!",
      text: `The contact ${filaEditada.name.value} has been created successfully.`,
      icon: "success",
      confirmButtonText: "Ok",
    });
    //todo mostrar sweet alert contacto actualizado
  }
};
/*validations
const validations = () => {
  let validatedData = true;
  if (!validateAmountCaracters(name, 2, 50)) {
    validatedData = false;
  }
  if (!validateAmountCaracters(lastname, 3, 50)) {
    validatedData = false;
  }
  if (!regEx.test(email.value)) {
    validatedData = false;
  }
  return validatedData;
};*/

//event handlers

btnModal.addEventListener("click", () => {
  formContact.reset();
  buildingContact = true; // reset the flag to indicate a new contact is being built
  modal.show();
}); // TERCERO escucha click en btnModal y muestra el contenido del modal tomado desde el dom por id por addContactModalLabel y muestra contenido div

const formContact = document.querySelector(".formContact");

formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  if (buildingContact) {
    // if buildingContact is true, create a new contact
    createContact();
    sectionTableContacts.classList.toggle(`d-none`);
    console.log(`probando probando`)
    
  } else {
    editContact(); // if buildingContact is false, edit the existing contact
  }
});
cargarContactos();


