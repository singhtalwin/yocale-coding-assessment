import { useEffect, useState } from "react";
import { Ticket, TicketStatus } from "../interfaces/ticket";
import { REST_API_URL } from "../constants/endpoints";
import axios from "axios";
import { TicketListView } from "../ticket/TicketListView";
import { CreateTicket } from "../ticket/CreateTicket";

import { Button, Table, TableBody, Typography } from "@mui/material";
import { TicketListHeader } from "./TicketListHeader";

const TICKETS_API_URL = `${REST_API_URL}/tickets?_expand=user`;

export const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "">("");
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

  const onStatusFilterChange = (status: TicketStatus) => {
    setStatusFilter(status);
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (statusFilter === "") {
      return true;
    }
    return ticket.status === statusFilter;
  });

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
      <Table>
        <TicketListHeader
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />
        <TableBody>
          {filteredTickets.map((ticket) => (
            <TicketListView key={ticket.id} ticket={ticket} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};
