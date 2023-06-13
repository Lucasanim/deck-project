import { Card, CardContent, Avatar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const DiscussionCommentCard = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex">
          <Avatar
            className="m-5"
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
          <div className="my-5 w-full mr-5">
            <Typography variant="body2" color="text.secondary">
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam. body2. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dign
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionCommentCard;
