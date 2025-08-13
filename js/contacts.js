export default class Contact {
  #id;
  #name;
  #lastname;
  #phone;
  #email;
  #img;
  #company;
  #jobtitle;
  #address;
  #notes;

  constructor(
    name,
    lastname,
    phone,
    email,
    img,
    company,
    jobtitle,
    address,
    notes,

  ) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#lastname = lastname;
    this.#phone = phone;
    this.#email = email;
    this.#img = img;
    this.#company = company;
    this.#jobtitle = jobtitle;
    this.#address = address;
    this.#notes = notes;

  }
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }
  get lastname() {
    return this.#lastname;
  }
  get phone() {
    return this.#phone;
  }
  get email() {
    return this.#email;
  }
  get img() {
    return this.#img;
  }
  get company() {
    return this.#company;
  }
  get jobtitle() {
    return this.#jobtitle;
  }
  get address() {
    return this.#address;
  }
  get notes() {
    return this.#notes;
  }

  
  set name(name) {
    this.#name = name;
  }
  set lastname(lastname) {
    this.#lastname = lastname;
  }
  set phone(phone) {
    this.#phone = phone;
  }
  set email(email) {
    this.#email = email;
  }
  set img(img) {
    this.#img = img;
  }
  set company(company) {
    this.#company = company;
  }
  set jobtitle(jobtitle) {
    this.#jobtitle = jobtitle;
  }
  set address(address) {
    this.#address = address;
  }
  set notes(notes) {
    this.#notes = notes;
  }


  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      img: this.img,
      company: this.company,
      jobtitle: this.jobtitle,
      address: this.address,
      notes: this.notes,
   
    };
  }
}
