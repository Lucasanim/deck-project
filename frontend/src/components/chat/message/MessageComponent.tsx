import { Typography, colors, useTheme } from "@mui/material";

interface Props {
  primary: boolean;
  text: string;
  time?: Date;
}

const MessageComponent: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={`m-3 p-3 rounded-lg w-fit max-w-[75%] ${
        props.primary ? "self-end" : ""
      }`}
      style={{
        backgroundColor: props.primary ? colors.blue[500] : colors.grey[500],
      }}
    >
      <Typography>{props.text}</Typography>
      <Typography fontSize="0.8rem" color="text.secondary" className="h-4">
        {props.time?.toDateString()}
      </Typography>
    </div>
  );
};

export default MessageComponent;
