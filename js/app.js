const btnModal = document.getElementById('btnModal');
console.log(btnModal);  

const modal = new bootstrap.Modal(document.getElementById('addContactModalLabel'));

btnModal.addEventListener('click', ()=>{
    modal.show()
})