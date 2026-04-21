const BASE_URL = "http://192.168.1.124:8000/api"; // ganti IP backend kamu

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login gagal");
  }

  return response.json();
};
