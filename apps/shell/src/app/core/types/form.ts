/**
 * Interface for login form data.
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Interface for registration form data.
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
}
