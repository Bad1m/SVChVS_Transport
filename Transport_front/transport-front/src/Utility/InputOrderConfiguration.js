import moment from "moment";

export function returnInputOrderConfiguration() {
  return {
    orderPrice: {
      element: "input",
      type: "number",
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Цена:",
    },
    orderData: {
      element: "input",
      type: "date",
      // value: moment(),
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Дата:",
    },
    orderTime: {
      element: "input",
      type: "time",
      // value: moment(),
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Время:",
    },
    сlient: {
      element: "input",
      type: "number",
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Клиент:",
    },
    transport: {
      element: "input",
      type: "number",
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Транспорт:",
    },
  };
}
