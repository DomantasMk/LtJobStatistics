import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const PieChart = ({ counts, titles }) => {
  const chartObject = {
    series: counts,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: titles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 320,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div id="pieChart">
      <ReactApexChart
        options={chartObject.options}
        series={chartObject.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

PieChart.propTypes = {
  counts: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
};

export default PieChart;
