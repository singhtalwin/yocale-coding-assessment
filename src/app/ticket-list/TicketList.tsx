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
            <TicketListView key={ticket.id} ticket={ticket} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};
