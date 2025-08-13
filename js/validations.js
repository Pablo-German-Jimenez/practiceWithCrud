export const validateAmountCaracters = (input,min,max) => {
        if(input.value.length >= min && input.value.length <=max){
       input.classList.add('is-valid');
       input.classList.remove('is-invalid')
      
        return true
    }else{
        input.classList.remove('is-valid')
        input.classList.add('is-invalid');
        return false
    }
};


export const validateField = (input, min, max, pattern = null) => {
  const value = input.value.trim();
  let isValid = true;

  if (value.length < min || value.length > max) {
    isValid = false;
  }

  if (pattern && !pattern.test(value)) {
    isValid = false;
  }

  input.classList.remove("is-valid", "is-invalid");
  input.classList.add(isValid ? "is-valid" : "is-invalid");

  return isValid;
};





export const validateEmail = (input) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(input.value.trim());

  input.classList.remove("is-valid", "is-invalid");
  input.classList.add(isValid ? "is-valid" : "is-invalid");

  return isValid;
};

export const validatePhone = (input) => {
  const phoneRegex = /^[0-9]{7,15}$/;
  const isValid = phoneRegex.test(input.value.trim());

  input.classList.remove("is-valid", "is-invalid");
  input.classList.add(isValid ? "is-valid" : "is-invalid");

  return isValid;
};

export const validateURL = (input) => {
  if (input.value.trim() === "") return true; // optional field

  const urlRegex = /^https?:\/\/.+/;
  const isValid = urlRegex.test(input.value.trim());

  input.classList.remove("is-valid", "is-invalid");
  input.classList.add(isValid ? "is-valid" : "is-invalid");

  return isValid;
};