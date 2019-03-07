export interface LoginUser {
  email: String,
  password: String
}

interface User {
  name: String,
  email: String
}

export interface LoginResult {
  status:Boolean, 
  msg?: String,
  token?: String,
  user?: User
}
