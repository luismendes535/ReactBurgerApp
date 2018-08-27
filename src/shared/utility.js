export const updateObject = (oldObject, updatedProperties)=>{
    return {
        ...oldObject,
        ...updatedProperties
    }
}

const validateEmail= (email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };


export const checkValidity = (value, rules, controlName) => {
    
    if (rules.required && value.trim() === "") return false;
    if (rules.minLength && value.length < rules.minLength) return false;
    if (rules.required && controlName == "email" && !validateEmail(value))
      return false;
    return true;
  };

 