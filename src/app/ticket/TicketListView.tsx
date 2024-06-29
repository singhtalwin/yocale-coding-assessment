import { Link } from "react-router-dom";
import { Ticket } from "../interfaces/ticket";
import { Box, TableCell, TableRow } from "@mui/material";
import { Avatar } from "../user/Avatar";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { UserSelect } from "../user/UserSelect";
import { User } from "../interfaces/user";
import axios from "axios";
import { REST_API_URL } from "../constants/endpoints";

interface TicketListViewProps {
  ticket: Ticket;
}

const TICKETS_API_URL = `${REST_API_URL}/tickets`;

export const TicketListView = ({ ticket }: TicketListViewProps) => {
  const [userSelectorOpen, setUserSelectorOpen] = useState(false);
  const showUserSelector = () => {
    setUserSelectorOpen(true);
  };

  const onUserChange =
    (ticket: Ticket) =>
    async (event: React.SyntheticEvent, value: User | null) => {
      console.log("value", value, "ticket", ticket);
      await axios.put(`${TICKETS_API_URL}/${ticket.id}`, {
        ...ticket,
        userId: value?.id,
      });

      setUserSelectorOpen(false);
    };

  return (
    <TableRow key={ticket.id}>
      <TableCell>
        <Link className="link" to={`/tickets/${ticket.id}`}>
          {ticket.number}
        </Link>
      </TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          {userSelectorOpen ? (
            <>
              <UserSelect
                selectedUser={ticket.user}
                onUserChange={onUserChange(ticket)}
              />
            </>
          ) : (
            <>
              <Avatar user={ticket.user} />
              <IconButton onClick={showUserSelector}>
                <EditIcon />
              </IconButton>
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};
