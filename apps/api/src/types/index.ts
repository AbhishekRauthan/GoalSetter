export interface registerUserBody {
  name: string;
  email: string;
  password: string;
}

export interface reqUser {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
