import { useNavigate } from "react-router-dom";
import { Ticket } from "../interfaces/ticket";

interface TicketListViewProps {
  ticket: Ticket;
}

export const TicketListView = ({ ticket }: TicketListViewProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tickets/${ticket.id}`);
  };

  return (
    <div key={ticket.id} className="ticket" onClick={handleClick}>
      <div>{ticket.number}</div>
      <div>{ticket.status}</div>
    </div>
  );
};
