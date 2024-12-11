import EncryptionService from "./data_security";

const BASE_URL = "http://localhost/sv_url/svurl-api/api/";

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status?.message || "Request failed");
  }

  const json_response = await response.json();

  if (json_response.payload && typeof json_response.payload === "string") {
    json_response.payload = EncryptionService.decrypt(json_response.payload);
  }

  return json_response;
}

export const api = {
  get: (endpoint: string) => fetchApi(endpoint),
  post: (endpoint: string, data: any) =>
    fetchApi(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
