import { Select, SelectChangeEvent } from "@mui/material";
import { TicketStatus } from "../interfaces/ticket";

interface TicketStatusProps {
  status: TicketStatus;
  onStatusChange: (
    event: SelectChangeEvent<"assigned" | "completed" | "unassigned">
  ) => void;
}

export const SelectTicketStatus = ({
  status,
  onStatusChange,
}: TicketStatusProps) => (
  <Select
    variant="outlined"
    value={status}
    onChange={onStatusChange}
    label="Status"
  >
    <option value="unassigned">Unassigned</option>
    <option value="assigned">Assigned</option>
    <option value="completed">Completed</option>
  </Select>
);
