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

export const API_URL =
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
