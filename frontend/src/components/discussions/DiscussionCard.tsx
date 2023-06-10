import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const card = <React.Fragment></React.Fragment>;

interface Props {
  title: string;
  body: string;
}

const DiscussionCard: React.FC<Props> = (props: Props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{ cursor: "pointer" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2">{props.body}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DiscussionCard;
