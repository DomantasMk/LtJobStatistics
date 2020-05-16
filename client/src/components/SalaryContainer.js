import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function SalaryContainer({ counts, titles }) {
        const [chartState] = useState({
                series: [{
                  name:"Aver. Salary",
                  data: counts
                }],
                options: {
                  chart: {
                    type: 'bar',
                    height: 350
                  },
                  plotOptions: {
                    bar: { 
                      horizontal: true,
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  xaxis: {
                    categories: titles,
                    title:{
                      text:"Average Specified Salary (€)",
                  }
                  },
                  yaxis:{
                    title:{
                      text:"Dev. Positions/Technologies/Tools",
                  }
                  }
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: titles,
            },
        },
    });
    return (
        <div>
            <ReactApexChart
                options={chartState.options}
                series={chartState.series}
                type='bar'
                height={350}
            />
        </div>
    );
}
