import { Card, CardContent, Avatar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import CommentDetail from "../../../models/discussions/CommentDetail";

interface Props {
  commentDetails: CommentDetail
}

const DiscussionCommentCard: React.FC<Props> = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <div className="flex">
          <Avatar
            className="m-5"
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {props.commentDetails.creatorUserName[0]}
          </Avatar>
          <div className="my-5 w-full mr-5">
            <Typography variant="body2">
              {props.commentDetails.body}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.commentDetails.createdAt?.toString()}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionCommentCard;
