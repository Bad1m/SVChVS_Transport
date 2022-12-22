export function convertStateToArrayOfFormObjects(formObject) {
  const formElementsArray = [];
  for (let key in formObject) {
    formElementsArray.push({
      id: key,
      config: formObject[key],
    });
  }

  return formElementsArray;
}

function checkValidity(value, validation) {
  let validationObject = {
    isValid: true,
    errorMessage: "",
  };

  if (validation) {
    if (validation.required) {
      validationObject.isValid = value.trim() !== "";
      validationObject.errorMessage = validationObject.isValid
        ? ""
        : "Поле пустое";
    }

    if (validationObject.isValid && validation.maxLength) {
      validationObject.isValid = value.length <= 60;
      validationObject.errorMessage = "Not allowed more than 60 charactes";
    }

    return validationObject;
  } else {
    return validationObject;
  }
}

export function executeValidationAndReturnFormElement(
  event,
  updatedClientForm,
  id
) {
  let formElement = { ...updatedClientForm[id] };
  formElement.value = id === "dateOfBirth" ? event : event.target.value;
  formElement.touched = true;

  const validationResponse = checkValidity(
    formElement.value,
    formElement.validation
  );

  formElement.valid = validationResponse.isValid;
  formElement.errorMessage = validationResponse.errorMessage;

  return formElement;
}

export function countInvalidElements(clientForm) {
  let countInvalidElements = 0;
  for (let element in clientForm) {
    if (!clientForm[element].valid) {
      countInvalidElements = countInvalidElements + 1;
      break;
    }
  }
  return countInvalidElements;
}
