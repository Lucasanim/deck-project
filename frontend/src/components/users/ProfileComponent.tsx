import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import User from "../../models/user/User";
import { Add, Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { StoreData } from "../../redux/store/Store";

interface Props {
  user: User;
}

const ProfileComponent: React.FC<Props> = (props: Props) => {
  const user = useSelector((store: StoreData) => store.auth.user);

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <Avatar variant="square" sx={{ width: 150, height: 150 }}>
          {props.user.username.slice(0, 2)}
        </Avatar>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.user.username}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.user.email}
          </Typography>

          {props.user.id != user?.id && (
            <Box sx={{ display: "flex" }}>
              <Button>
                <Add className="mr-2" sx={{ fontSize: 20 }} /> Follow
              </Button>
              <Button>
                message <Send className="ml-2" sx={{ fontSize: 20 }} />
              </Button>
            </Box>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProfileComponent;
