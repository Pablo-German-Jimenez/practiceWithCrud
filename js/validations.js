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
