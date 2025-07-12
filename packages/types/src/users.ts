export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * User data stored locally
 */
export interface StoredUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}
