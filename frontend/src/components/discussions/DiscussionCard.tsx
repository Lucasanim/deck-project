import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const card = <React.Fragment></React.Fragment>;

interface Props {
  title: string;
  body: string;
  id: string | number;
  onClick?: (id: string | number) => any;
}

const DiscussionCard: React.FC<Props> = (props: Props) => {
  return (
    <Box sx={{ minWidth: 275 }} onClick={() => props.onClick && props.onClick(props.id)}>
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
