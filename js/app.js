import Contact from './contacts.js';

const btnModal = document.getElementById('btnModal');

const modal = new bootstrap.Modal(document.getElementById('addContactModalLabel'));

btnModal.addEventListener('click', ()=>{
    modal.show()
})
const name = document.getElementById('name');
const surname = document.getElementById('lastname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const img = document.getElementById('img');
const company = document.getElementById('company');
const jobtitle = document.getElementById('jobtitle');
const address = document.getElementById('address');
const notes = document.getElementById('notes');
const hobbies = document.getElementById('hobbies');
const superpoder = document.getElementById('superpoder');
console.log(name, surname, phone, email, img, company, jobtitle, address, notes, hobbies, superpoder);
//function create contact
const createContact = ()=>{

    //search data of form and create a object contact
    const contactNew = new Contact(1,1,1,1)
    console.log(contactNew);
    //save the contact in agenda contacts
    //save the agenda in localStorage

}

//event handlers
const formContact = document.querySelector('#addContactForm')
formContact.addEventListener('submit',(e)=>{
    e.preventDefault();
    createContact();
})