export default class Contact {
  #id;
  #name;
  #surname;
  #phone;
  #email;
  #img;
  #company;
  #jobtitle;
  #address;
  #notes;
  #hobbies;
  #superpoder;
  constructor(
    name,
    surname,
    phone,
    email,
    img,
    company,
    jobtitle,
    address,
    notes,
    hobbies,
    superpoder
  ) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#surname = surname;
    this.#phone = phone;
    this.#email = email;
    this.#img = img;
    this.#company = company;
    this.#jobtitle = jobtitle;
    this.#address = address;
    this.#notes = notes;
    this.#hobbies = hobbies;
    this.#superpoder = superpoder;
  }
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }
  get surname() {
    return this.#surname;
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
  get hobbies() {
    return this.#hobbies;
  }
  get superpoder() {
    return this.#superpoder;
  }
  set name(name) {
    this.#name = name;
  }
  set surname(surname) {
    this.#surname = surname;
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
  set hobbies(hobbies) {
    this.#hobbies = hobbies;
  }
  set superpoder(superpoder) {
    this.#superpoder = superpoder;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      img: this.img,
      company: this.company,
      jobtitle: this.jobtitle,
      address: this.address,
      notes: this.notes,
      hobbies: this.hobbies,
      superpoder: this.superpoder,
    };
  }
}
