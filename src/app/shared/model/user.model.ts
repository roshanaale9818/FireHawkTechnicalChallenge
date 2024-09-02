export interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}
