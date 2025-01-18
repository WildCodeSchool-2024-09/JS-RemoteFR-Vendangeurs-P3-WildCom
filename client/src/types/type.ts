export type User = {
  id: number;
  username: string;
  avatar: string;
};

export type Post = {
  id: number;
  category: string;
  picture: string | null;
  content: string;
  timestamp: string;
  totalComments: number;
  user: User;
};

export type Comment = {
  id: number;
  content: string;
  timestamp: string;
  user: User;
};
