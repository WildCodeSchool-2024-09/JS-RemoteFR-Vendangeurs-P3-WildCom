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
  totalLikes: number;
  user: User;
};

export type Event = {
  id: number;
  content: string;
  category: string;
  picture: string | null;
  timestamp: string;
  title: string;
  place: string;
  calendar: string;
  totalComments: number;
  totalParticipations: number;
  user: User;
};

export type Comment = {
  id: number;
  content: string;
  timestamp: string;
  user: User;
};

export type LocationProps = {
  location: string;
};
