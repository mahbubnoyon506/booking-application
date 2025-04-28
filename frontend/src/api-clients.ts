import { FormData } from "./pages/Register";
import { SignInFormValues } from "./pages/SignIn";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";

export const handleRegister = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    credentials: "include",
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

export const handleSignIn = async (formData: SignInFormValues) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const verifyToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
