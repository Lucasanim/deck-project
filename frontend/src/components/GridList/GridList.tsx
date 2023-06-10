import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  elements: ReactNode[];
}

const GridList = (props: Props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 4, md: 8 }}
    >
      {props.elements.map((element, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          {element}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridList;
