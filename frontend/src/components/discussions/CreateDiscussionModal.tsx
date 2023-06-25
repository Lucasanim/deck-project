import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import User from "../../models/user/User";
import { createDiscussion } from "../../services/discussions/DiscussionsService";
import Discussion from "../../models/discussions/Discussion";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  close: () => void;
}

const CreateDiscussionModal: React.FC<Props> = (props: Props) => {
  const MAX_TEXT_SIZE = 500;
  const MAX_TITLE_SIZE = 100;
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const navigate = useNavigate();

  const user: User = useSelector((store) => store.auth.user);

  const handleCreate = async () => {
    try {
      const discussion = {
        creatorId: user.id,
        title: title,
        body: body,
        comments: [],
        createdAt: new Date(),
      };

      const response = await createDiscussion(
        discussion as unknown as Discussion
      );
      clearState();
      props.close();
      navigate("/app/discussion/" + response.data.id);
    } catch (e) {
      console.log(e);
      handleCancel();
    }
  };

  const clearState = () => {
    setTitle("");
    setBody("");
  };

  const handleCancel = () => {
    clearState();
    props.close();
  };

  const handleBodyChange = (text: string) => {
    let textBody = text;
    if (text.length > MAX_TEXT_SIZE) {
      textBody = text.slice(0, MAX_TEXT_SIZE);
    }
    setBody(textBody);
  };

  const handleTitleChange = (text: string) => {
    let textTitle = text;
    if (text.length > MAX_TITLE_SIZE) {
      textTitle = text.slice(0, MAX_TITLE_SIZE);
    }
    setTitle(textTitle);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>New discussion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <TextField
            id="description"
            label="Description"
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
            value={body}
            onChange={(e) => handleBodyChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateDiscussionModal;
