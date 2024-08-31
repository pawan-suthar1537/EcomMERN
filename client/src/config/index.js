export const registerformcontrols = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    required: true,
    componenttype: "input",
  },
  {
    name: "email",
    label: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    componenttype: "input",
  },
  {
    name: "password",
    label: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    componenttype: "input",
  },
];
export const loginformcontrols = [
  {
    name: "email",
    label: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    componenttype: "input",
  },
  {
    name: "password",
    label: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    componenttype: "input",
  },
];

export const addnewprodutformcontrols = [
  {
    name: "title",
    label: "Product Title",
    type: "text",
    placeholder: "Enter product Title",
    required: true,
    componenttype: "input",
  },
  {
    name: "description",
    label: "Product Description",
    type: "text",
    placeholder: "Enter product description",
    required: true,
    componenttype: "textarea",
  },
  {
    name: "price",
    label: "Product Price",
    type: "number",
    placeholder: "Enter product price",
    required: true,
    componenttype: "input",
  },
  {
    name: "saleprice",
    label: "Sale Price",
    type: "number",
    placeholder: "Enter product Sale Price",

    componenttype: "input",
  },
  {
    name: "totalstock",
    label: "Product Stock",
    type: "number",
    placeholder: "Enter product Stock",

    componenttype: "input",
  },
  {
    name: "category",
    label: "Product Category",
    componenttype: "select",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "clothing", label: "Clothing" },
      { id: "home", label: "Home" },
    ],
  },
  {
    name: "brand",
    label: "Product Brand",
    componenttype: "select",
    options: [
      { id: "hello", label: "Nike" },
      { id: "pooma", label: "Poona" },
      { id: "nike", label: "Hello" },
    ],
  },
];

export const API_URL =
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
