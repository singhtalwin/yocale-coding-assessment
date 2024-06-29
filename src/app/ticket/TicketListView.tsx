import { Link } from "react-router-dom";
import { Ticket } from "../interfaces/ticket";
import { TableCell, TableRow } from "@mui/material";
import { Avatar } from "../user/Avatar";

interface TicketListViewProps {
  ticket: Ticket;
}

export const TicketListView = ({ ticket }: TicketListViewProps) => {
  return (
    <TableRow key={ticket.id}>
      <TableCell>
        <Link className="hover:bg-slate-100" to={`/tickets/${ticket.id}`}>
          {ticket.number}
        </Link>
      </TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>{ticket.user && <Avatar user={ticket.user} />}</TableCell>
    </TableRow>
  );
};
