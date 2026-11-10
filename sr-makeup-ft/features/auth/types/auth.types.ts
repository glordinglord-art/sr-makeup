export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "CLIENT";
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

