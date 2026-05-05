export default async function apiRequest<T>(
  pathname: string,
  data?: T,
  method = "POST",
) {
  const options: RequestInit = {
    method: method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  return await fetch(`${import.meta.env.VITE_API_URL}/v1/${pathname}`, options);
}
