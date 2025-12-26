const BASE_URL = "http://localhost:3000/api";

export const api = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : null,
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, options);
  return res.json();
};
