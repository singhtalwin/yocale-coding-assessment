import { User } from "./user";

export interface Ticket {
  id: number;
  userId?: number;
  number: string;
  status: TicketStatus;
  user?: User;
}

export type TicketStatus = "assigned" | "completed" | "unassigned";
