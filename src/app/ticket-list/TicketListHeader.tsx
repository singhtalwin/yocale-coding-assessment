import {
  TableHead,
  TableRow,
  TableCell,
  SelectChangeEvent,
  Select,
  FormControl,
  FormLabel,
} from "@mui/material";
import { TicketStatus } from "../interfaces/ticket";

interface TicketListHeaderProps {
  statusFilter: TicketStatus | "";
  onStatusFilterChange: (status: TicketStatus) => void;
}

export const TicketListHeader = ({
  statusFilter,
  onStatusFilterChange,
}: TicketListHeaderProps) => {
  const onStatusChange = (
    event: SelectChangeEvent<"assigned" | "completed" | "unassigned">
  ) => {
    onStatusFilterChange(event.target.value as TicketStatus);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Number</TableCell>
        <TableCell>
          <FormControl>
            <FormLabel>Filter by Status</FormLabel>
            <Select
              native
              variant="outlined"
              value={statusFilter}
              onChange={onStatusChange}
            >
              <option value="">None</option>
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>User</TableCell>
      </TableRow>
    </TableHead>
  );
};
