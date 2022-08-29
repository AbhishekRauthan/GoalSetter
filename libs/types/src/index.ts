export interface UserDetails {
  name: string;
  email: string;
  password: string;
}

export interface UserObject {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  email: string;
  name: string;
  token: string;
  _id: string;
}
