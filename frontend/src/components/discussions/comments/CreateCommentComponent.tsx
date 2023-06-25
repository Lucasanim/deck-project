import * as React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { Button, CardContent } from "@mui/material";
import { createComment } from "../../../services/discussions/comments/CommentsService";
import Comment from "../../../models/discussions/Comment";

interface Props {
  discussionId: string | number;
}

const CreateCommentComponent: React.FC<Props> = (props: Props) => {
  const MAX_TEXT_SIZE = 500;
  const [body, setBody] = React.useState("");

  const handleSend = async (event: React.ChangeEvent) => {
    event.preventDefault();
    const comment = {
      creatorId: 0,
      body: body,
      createdAt: new Date(),
    };
    try {
      await createComment(comment as Comment);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBodyChange = (text: string) => {
    let textBody = text;
    if (text.length > MAX_TEXT_SIZE) {
      textBody = text.slice(0, MAX_TEXT_SIZE);
    }
    setBody(textBody);
  };

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
            <TextField
              className="w-full"
              label="Comment"
              multiline
              maxRows={4}
              value={body}
              onChange={(event) => handleBodyChange(event.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mr-5">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateCommentComponent;
