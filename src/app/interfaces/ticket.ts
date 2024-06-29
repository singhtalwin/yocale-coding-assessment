import { User } from "./user";

export interface Ticket {
  id: number;
  userId?: number;
  number: string;
  status: string;
  user?: User;
}
