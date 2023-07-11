import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import User from "../../models/user/User";

interface Props {
  users: User[];
  onClick: (user: User) => void;
}

const UsersList: React.FC<Props> = (props: Props) => {
  return (
    <List>
      {props.users.map((user, index) => (
        <ListItem
          key={index}
          onClick={() => props.onClick(user)}
          className="cursor-pointer"
        >
          <ListItemAvatar>
            <Avatar>{user.username[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.username} />
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
