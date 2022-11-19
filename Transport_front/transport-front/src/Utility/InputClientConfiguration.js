export function returnInputClientConfiguration() {
  return {
    lastName: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Фамилия:",
    },
    firstName: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true, maxLength: 60 },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Имя:",
    },
    patronymic: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Отчество:",
    },
  };
}
