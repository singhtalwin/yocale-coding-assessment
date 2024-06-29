import { Autocomplete, TextField } from "@mui/material";
import { User } from "../interfaces/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { REST_API_URL } from "../constants/endpoints";

interface UserSelectProps {
  selectedUser: User | null | undefined;
  onUserChange: (event: React.SyntheticEvent, value: User | null) => void;
}

export const UserSelect = ({ selectedUser, onUserChange }: UserSelectProps) => {
  const [userOptions, setUserOptions] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await axios.get(`${REST_API_URL}/users`);
      setUserOptions(
        data.data.map((user: User) => ({
          ...user,
          label: `${user.firstName} ${user.lastName}`,
        }))
      );
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Autocomplete
        options={userOptions}
        renderInput={(params) => <TextField {...params} label="User" />}
        value={selectedUser}
        onChange={onUserChange}
        sx={{ width: 300 }}
      />
    </>
  );
};
