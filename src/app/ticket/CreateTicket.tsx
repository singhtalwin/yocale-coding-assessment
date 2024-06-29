import { Box, Button, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { REST_API_URL } from "../constants/endpoints";
import React, { useState } from "react";
import { TicketStatus } from "../interfaces/ticket";
import { User } from "../interfaces/user";
import { SelectTicketStatus } from "./SelectTicketStatus";
import { UserSelect } from "../user/UserSelect";

interface CreateTicketProps {
  onCreate: () => void;
  onDiscard: () => void;
}

const TICKETS_API_URL = `${REST_API_URL}/tickets`;

export const CreateTicket = ({ onCreate, onDiscard }: CreateTicketProps) => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [status, setStatus] = useState<TicketStatus>("unassigned");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onTicketNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketNumber(event.target.value);
  };
  const onStatusChange = (
    event: SelectChangeEvent<"assigned" | "completed" | "unassigned">
  ) => {
    setStatus(event.target.value as TicketStatus);
  };
  const onUserChange = (event: React.SyntheticEvent, value: User | null) => {
    setSelectedUser(value);
  };

  const onCreateTicket = async () => {
    await axios.post(TICKETS_API_URL, {
      number: ticketNumber,
      status,
      userId: selectedUser?.id,
    });
    onCreate();
  };

  return (
    <div>
      <form>
        <Box display="flex" gap={3}>
          <TextField
            label="Number"
            variant="outlined"
            onChange={onTicketNumberChange}
            value={ticketNumber}
          />
          <SelectTicketStatus status={status} onStatusChange={onStatusChange} />
          <UserSelect selectedUser={selectedUser} onUserChange={onUserChange} />
          <Button
            variant="contained"
            color="success"
            onClick={onCreateTicket}
            sx={{ marginRight: 1 }}
          >
            Create
          </Button>
          <Button variant="contained" color="error" onClick={onDiscard}>
            Discard
          </Button>
        </Box>
      </form>
    </div>
  );
};
