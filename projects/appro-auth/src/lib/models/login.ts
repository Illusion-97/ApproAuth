import {User} from "./user";

export interface Login {
  email: string,
  password: string
}

export interface LoginResponse {
  user: User,
  accessToken: string
}
