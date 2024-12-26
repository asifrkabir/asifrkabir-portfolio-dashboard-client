export interface IUser {
  _id?: string;
  userId?: string;
  name?: string;
  email: string;
  role: string;
  profilePicture?: string;
  isSuspended?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISuspendUserToggle {
  id: string;
  payload: {
    isSuspended: boolean;
  };
}
