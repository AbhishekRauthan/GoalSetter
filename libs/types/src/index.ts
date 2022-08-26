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
