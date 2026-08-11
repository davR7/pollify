export interface Poll {
  id: string;
  title: string;
  options: string[];
  startsAt: string;
  endsAt: string;
  createdAt: string;
  user: {
    id: string;
    fullname: string;
  };
}
