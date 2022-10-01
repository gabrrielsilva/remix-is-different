export interface User {
  id: number;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
}