import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import axios from 'axios';

export default class ChartsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { series: [0,0], titles: ["",""] }
      }
    componentDidMount() {
        axios
            .get(`/api/main/Technologies/10`)
            .then((res) => {
                let counts = [];
                let names = [];
                res.data.map(obj => {
                    counts.push(obj.count);
                    names.push(obj.title);
                });

                this.setState({
                    series:counts,
                    titles:names});
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Container maxWidth="lg">
                    <ColumnChart counts={this.state.series} titles={this.state.titles} key={this.state.series}/>
                    
                    <Box display="flex" justifyContent="center">
                        <PieChart counts={this.state.series} titles={this.state.titles} key={this.state.series}/>
                    </Box>
                </Container>
            </div>
        )
    }
}
