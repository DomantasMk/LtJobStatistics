import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Box, ListItemText } from "@material-ui/core";

const Introduction = (props) => {
  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={3}>
        <Typography align="center" variant="h2" component="h3" gutterBottom>
          About
        </Typography>
        <Typography variant="body1">
          This website was made to research the trends of technologies/tools
          mentioned in IT job adverts. Below you can see generated charts from
          data we gathered, the default charts are of top 10 technologies in the
          database, but there is a filter if you want to view different data,
          feel free to check out
          <span role="img" aria-label="cool-emoji">
            😎
          </span>
          .
        </Typography>
        <Box mt={2}>
          <Typography variant="body1">For this project we used:</Typography>
          <ListItemText>
            <ul>
              <li>
                Client side - <b>React.js</b>
              </li>
              <li>
                Server side - <b>Node.js</b>
              </li>
              <li>
                Scraping data - <b>Puppeter library</b>
              </li>
              <li>
                Database - <b>MongoDB</b>
              </li>
              <li>
                Framework - <b>Express.js</b>
              </li>
            </ul>
          </ListItemText>
        </Box>
      </Box>
    </Container>
  );
};

export default Introduction;
