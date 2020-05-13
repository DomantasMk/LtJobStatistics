import React, { useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { ChartContext } from './ChartContext';

const ColumnChart = ({ counts, titles }) => {
    const { selectedKeywords, setSelectedKeywords } = useContext(ChartContext);
    const [chartState, setChartState] = useState({
        series: [
            {
                name: 'Viso',
                data: counts, //Series of data for the chart
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
                categories: titles,
                labels: {
                    style: {
                        colors: '#2E93fA',

                        fontSize: '12px',
                    },
                },
            },
        },
    });

    return (
        <div id='chart'>
            {console.log('rerender')}
            <ReactApexChart
                options={chartState.options}
                series={chartState.series}
                type='bar'
                height={350}
            />
        </div>
    );
};

ColumnChart.propTypes = {
    counts: PropTypes.array.isRequired,
    titles: PropTypes.array.isRequired,
};

export default ColumnChart;
