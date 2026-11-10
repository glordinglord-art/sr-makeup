const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // En el navegador, siempre usa la ruta relativa del mismo dominio
  if (typeof window !== "undefined") {
    return "/api";
  }
  // En SSR (Server-Side), si existe el binding de Vercel usa BACKEND_URL
  if (process.env.BACKEND_URL) {
    return `${process.env.BACKEND_URL}/api`;
  }
  // Fallback para desarrollo local
  return "http://localhost:3001/api";
};

const API_BASE_URL = getBaseUrl();

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.message || `Error en la solicitud: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
