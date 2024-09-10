import { Divider, Grid, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/AccountCircleTwoTone";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import ExitIcon from "@mui/icons-material/ExitToAppTwoTone";
import { useNavigate } from "react-router-dom";

export default function MultiDiv(props) {
  var navigate = useNavigate();
  return (
    <Paper
      elevation={2}
      style={{
        display: props.isOpenDiv ? "flex" : "none",
        width: "16%",
        position: "absolute",
        top: 65,
        right: 10,
        zIndex: 2,
      }}
    >
      <Grid
        container
        spacing={1}
        style={{ margin: 5, fontFamily: "Kanit", fontWeight: "bold" }}
      >
        <Grid item xs={6}>
          My Profile
          <Divider />
        </Grid>
        <Grid
          item
          xs={6}
          onClick={() => navigate("/signin")}
          style={{
            display: "flex",
            justifyContent: "end",
            padding: 4,
            marginTop: 4,
          }}
        >
          <PersonIcon />
        </Grid>
        <Grid item xs={6}>
          My Order
          <Divider />
        </Grid>

        <Grid
          item
          xs={6}
          onClick={() => navigate("/order")}
          style={{ display: "flex", justifyContent: "end", padding: 4 }}
        >
          <ListIcon />
        </Grid>

        <Grid item xs={6}>
          Logout
          <Divider />
        </Grid>
        <Grid
          item
          xs={6}
          style={{ display: "flex", justifyContent: "end", padding: 4 }}
        >
          <ExitIcon />
        </Grid>
      </Grid>
    </Paper>
  );
}
