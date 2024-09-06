const validateFormData = (user) => {

  // check if required fields are empty 
  if (user.name.trim() === '') {
    return [false, "Name is required."]
  }
  if (user.email.trim() === "") {
    return [false, "Email is required."];
  }
  if (user.phone.trim() === "") {
    return [false, "Phone is required."];
  }

  var validRegexForEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!user.email.match(validRegexForEmail)) {
    return [false, "Email is not valid"]
  }

  return [true, ""]
}


export {validateFormData}