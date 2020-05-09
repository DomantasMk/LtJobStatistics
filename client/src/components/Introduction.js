import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default class Introduction extends Component {
    render() {
        return (
            <div>
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h3" gutterBottom>
                        Introduction
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Cia tutis contenta rasys
                    </Typography>
                </Container>
            </div>
        )
    }
}
