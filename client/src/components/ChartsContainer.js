import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';

export default class ChartsContainer extends Component {
    render() {
        return (
            <div>
                <Container maxWidth="lg">
                    <ColumnChart/>
                    <Box display="flex" justifyContent="center">
                        <PieChart/>
                    </Box>
                </Container>
            </div>
        )
    }
}
