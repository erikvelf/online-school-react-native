export interface UserRequest {
  profile: User;
}

export interface User {
  id: number;
  name: string;
  surname?: string;
  photo?: string;
}
