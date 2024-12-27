export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
}
