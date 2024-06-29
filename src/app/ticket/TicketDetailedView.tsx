import { useEffect, useState } from "react";
import { Ticket } from "../interfaces/ticket";
import { REST_API_URL } from "../constants/endpoints";
import axios from "axios";
import { useParams } from "react-router-dom";

const TICKETS_API_URL = `${REST_API_URL}/tickets`;

export const TicketDetailedView = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const data = await axios.get(`${TICKETS_API_URL}/${id}`);
      setTicket(data.data);
    };

    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div key={ticket.id} className="ticket">
      <div>{ticket.number}</div>
      <div>{ticket.status}</div>
      <div>{ticket.userId}</div>
    </div>
  );
};
