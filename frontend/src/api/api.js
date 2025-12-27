const BASE_URL = "http://localhost:3000/api";

export const api = async (endpoint, method = "GET", body = null) => {
  if (typeof method !== "string") {
    throw new Error("HTTP method harus string (GET, POST, PUT, DELETE)");
  }

  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const res = await fetch(`http://localhost:3000/api/${endpoint}`, options);

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
};
