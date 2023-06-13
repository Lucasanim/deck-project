import * as React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { Button, CardContent } from "@mui/material";

const CreateCommentComponent: React.FC = () => {
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
            />
          </div>
        </div>
        <div className="flex justify-end mr-5">
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateCommentComponent;
