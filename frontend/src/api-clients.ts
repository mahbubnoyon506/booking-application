import { FormData } from "./pages/Register";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";

export const handleRegister = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
