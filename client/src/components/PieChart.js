import React from 'react';
import ReactApexChart from 'react-apexcharts';
export default class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: props.counts,
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: props.titles,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
            </div>
        );
    }
}
