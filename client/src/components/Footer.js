import React from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const Footer = (props) => {
  return (
    <Container maxWidth={"lg"}>
      <Box style={{ textAlign: "center" }} mt={8} mb={5}>
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
    </Container>
  );
};

export default Footer;
