export type User = {
  id: number;
  username: string;
  avatar: string;
};

export type Post = {
  id: number;
  categoryName: string;
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
  categoryName: string;
  picture: string | null;
  timestamp: string;
  title: string;
  place: string;
  calendar: string;
  time: string;
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

export type Category = {
  id: number;
  name: string;
};
