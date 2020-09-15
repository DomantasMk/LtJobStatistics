import React from "react";
import { Box, Typography, IconButton, Grid, Tooltip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const boxStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0) 32%, rgba(0,143,251,1) 100%)",
  textAlign: "center",
};

const Footer = (props) => {
  return (
    <Box style={boxStyle} width="100%" mt={7}>
      <Typography variant={"h6"}>
        You can find code and developers here :)
      </Typography>
      <Box mt={2} mb={3}>
        <Tooltip title="Project repository">
          <IconButton
            href="https://github.com/DomantasMk/LtJobStatistics"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Domantas linked in profile">
          <IconButton
            href="https://www.linkedin.com/in/domantas-mikelionis-36aa84172/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tautvydas linked in profile">
          <IconButton
            href="https://www.linkedin.com/in/tautvydas-gustas/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid></Grid>
      <Typography variant={"body1"}>
        © LTJobStatistics {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
