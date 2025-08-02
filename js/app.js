import Contact from "./contacts.js";

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
const hobbies = document.getElementById("hobbies");
const superpoder = document.getElementById("superpoder");
const tablaContactoBody = document.getElementById("tablaContactoBody");

const agenda = JSON.parse(localStorage.getItem("agenda")) || []; // si no hay nada en local storage, crea un array vacio

//add contacts to table
//if agenda has contacts, draw them in table
const cargarContactos = () => {
  if (agenda.length !== 0) {
    agenda.map((itemContacto, indice) =>
      dibujarFilas(itemContacto, indice + 1)
    );
  }
}; //draw rows in table
const dibujarFilas = (itemContacto, indice) => {
  tablaContactoBody.innerHTML += `
   <tr>
            <th scope="row">${indice}</th>
            <td>${itemContacto.name}</td>
            <td>${itemContacto.surname}</td>
            <td>${itemContacto.phone}</td>
            <td>${itemContacto.email}</td>
            <td><img
              src=${itemContacto.img}
              alt=${itemContacto.name}
              class="img-thumbnail rounded-circle w-25 h-25">
            </td>
            <td><div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" class="btn btn-danger my-1 mx-1"><i class="bi bi-trash" onClick="deleteContact('${itemContacto.id}')"></i></button>
  <button type="button" class="btn btn-warning my-1 mx-1"><i class="bi bi-pencil-square"></i></button>
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
    title: "Contact created!",
    text: `The contact ${name.value} has been created successfully.`,
    icon: "success",
    confirmButtonText: "Ok",
  });
  formContact.reset();
  dibujarFilas(contactNew, agenda.length);
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
    console.log(result)
    
    if (result.isConfirmed) {
      //aqui agrego la logica para borrar
      //tengo que buscar en que posicion esta el contacto
      const indexContact = agenda.findIndex((contact)=> contact.id === id)
      //console.log(indexContact)
      //con splice borramos el elemento de  determinada posicion del array
      agenda.splice(indexContact,1);
      //actualizo el local storage
      //tablaContactoBody.innerHTML = ""; //limpio el tbody
      //cargarContactos(); //vuelvo a cargar los contactos    
      tablaContactoBody.children[indexContact].remove() //limpio el tbody
      saveLocalStorage()
       
      
      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
      });
    }
    
  });
};

//event handlers
const formContact = document.querySelector("#addContactForm");
formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  createContact();
});
cargarContactos();

btnModal.addEventListener("click", () => {
  modal.show();
}); // TERCERO escucha click en btnModal y muestra el contenido del modal tomado desde el dom por id por addContactModalLabel y muestra contenido div
