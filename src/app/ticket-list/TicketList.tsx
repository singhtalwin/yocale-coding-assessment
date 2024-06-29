import { useEffect, useState } from "react";
import { Ticket } from "../interfaces/ticket";
import { REST_API_URL } from "../constants/endpoints";
import axios from "axios";
import { TicketListView } from "../ticket/TicketListView";
import { CreateTicket } from "../ticket/CreateTicket";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const TICKETS_API_URL = `${REST_API_URL}/tickets?_expand=user`;

export const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showCreateTicket, setShowCreateTicket] = useState<boolean>(false);
  const addTicketOnClick = () => {
    setShowCreateTicket(true);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await axios.get(TICKETS_API_URL);
      setTickets(data.data);
    };

    fetchTickets();
  }, []);

  console.log(tickets);

  return (
    <>
      <h3 className="ticket-list">Ticket List</h3>
      <button onClick={addTicketOnClick}>Add Ticket</button>
      {showCreateTicket && <CreateTicket />}
      filter (by status), assign
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <Link to={`/tickets/${ticket.id}`}>{ticket.number}</Link>
              </TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                {ticket.user?.firstName} {ticket?.user?.lastName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
