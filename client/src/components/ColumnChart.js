import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ColumnChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    data: props.counts, //Series of data for the chart
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        },
                    },
                },
                colors: ['#2E93fA', '#2E93fA', '#2E93fA', '#2E93fA', '#2E93fA'],
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    //series of data labels for the chart
                    categories: props.titles,
                    labels: {
                        style: {
                            colors: 
                                '#2E93fA',
                            
                            fontSize: '12px',
                        },
                    },
                },
            },
        };
    }
    componentDidMount(){
        
    }

    render() {
        return (
            <div id='chart'>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type='bar'
                    height={350}
                />
            </div>
        );
    }
}
