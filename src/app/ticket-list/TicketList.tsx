import { useEffect, useState } from "react";
import { Ticket } from "../interfaces/ticket";
import { REST_API_URL } from "../constants/endpoints";
import axios from "axios";
import { TicketListView } from "../ticket/TicketListView";
import { CreateTicket } from "../ticket/CreateTicket";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const TICKETS_API_URL = `${REST_API_URL}/tickets?_expand=user`;

export const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showCreateTicketForm, setShowCreateTicketForm] =
    useState<boolean>(false);
  const revealCreateTicketOnClick = () => {
    setShowCreateTicketForm(true);
  };
  const onCreateTicket = () => {
    setShowCreateTicketForm(false);
  };
  const onCancelCreateTicket = () => {
    setShowCreateTicketForm(false);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await axios.get(TICKETS_API_URL);
      setTickets(data.data);
    };

    fetchTickets();
  }, []);

  return (
    <>
      <Typography variant="h3" component="h3">
        Ticket List
      </Typography>
      {showCreateTicketForm ? (
        <CreateTicket
          onCreate={onCreateTicket}
          onDiscard={onCancelCreateTicket}
        />
      ) : (
        <Button variant="contained" onClick={revealCreateTicketOnClick}>
          Create Ticket
        </Button>
      )}
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
