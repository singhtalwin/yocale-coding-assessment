import { User } from "../interfaces/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface AvatarProps {
  user: User;
}

// faker images unsupported cross origin
const IMAGES_SUPPORTED = false;

export const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="flex py-4 first:pt-0 last:pb-0">
      {IMAGES_SUPPORTED ? (
        <img className="h-10 w-10 rounded-full" src={user.image} alt="avatar" />
      ) : (
        <AccountCircleIcon />
      )}
      <div className="ml-3 overflow-hidden">
        <p className="text-sm font-medium text-slate-900">
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};
