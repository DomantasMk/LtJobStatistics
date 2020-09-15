import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const ColumnChart = ({ counts, titles }) => {
  const chartObject = {
    series: [
      {
        name: "Job ads",
        data: counts, //Series of data for the chart
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      colors: ["#2E93fA", "#2E93fA", "#2E93fA", "#2E93fA", "#2E93fA"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
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
            colors: "#2E93fA",

            fontSize: "12px",
          },
        },
        title: {
          text: "Dev. Positions/Technologies/Tools",
        },
      },
      yaxis: {
        title: {
          text: "Job postings count",
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartObject.options}
        series={chartObject.series}
        type="bar"
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
