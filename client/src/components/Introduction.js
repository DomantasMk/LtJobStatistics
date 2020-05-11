import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const Introduction = (props) => {
    return (
        <Container maxWidth='lg'>
            <Typography variant='h2' component='h3' gutterBottom>
                Introduction
            </Typography>
            <Typography variant='body1' gutterBottom>
                Cia tutis contenta rasys
            </Typography>
        </Container>
    );
};

export default Introduction;
