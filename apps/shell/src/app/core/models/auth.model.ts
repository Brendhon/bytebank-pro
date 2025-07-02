/**
 * Authentication response payload from the API
 */
export interface AuthPayload {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

/**
 * Login input data
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Register input data
 */
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
}
