interface Fetch<U> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key in string]: unknown };
  body?: U;
}

export const api = process.env.NEXT_PUBLIC_API_URL;

export default async function fetcher<T, U>({
  url,
  method = "GET",
  headers = {},
  body,
}: Fetch<U>): Promise<T> {
  let options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
  };
  return fetch(url, options).then((res) => {
    return res.json() as T;
  });
}

export async function sendRequest<T, U>(arg: Fetch<U>) {
  return fetcher<T, U>(arg);
}
