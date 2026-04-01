export interface AuthUser {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: AuthUser }> {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error };
    return { success: true, message: data.message, user: data.user };
  } catch {
    return { success: false, message: "Network error." };
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: AuthUser }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error };
    return { success: true, message: data.message, user: data.user };
  } catch {
    return { success: false, message: "Network error." };
  }
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return null;
    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
}
