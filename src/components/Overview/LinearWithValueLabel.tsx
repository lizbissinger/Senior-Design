import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearWithValueLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "80vh",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "50%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" className={`dark:text-white`}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default LinearWithValueLabel;
