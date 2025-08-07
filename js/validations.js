export const validateAmountCaracters = (input,min,max) => {
    if(input.length >= min && input.value <=max){
        return true
    }else{
        return false
    }
};
