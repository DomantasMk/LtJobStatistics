import React from 'react';
import ReactApexChart from 'react-apexcharts';
export default class ColumnChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [{
                data: [100, 22, 10, 28, 16, 21, 13, 30] //Series of data for the chart
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    }
                },
                colors:['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: { //series of data labels for the chart
                    categories: [
                        'Dick',
                        'Javascript',
                        'Javascript',
                        'Javascript',
                        'Javascript',
                        'Javascript',
                        'Javascript',
                        'Javascript',
                    ],
                    labels: {
                        style: {
                            colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
                            fontSize: '12px'
                        }
                    }
                }
            },
        };
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/main/Technologies/1').then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }
}
