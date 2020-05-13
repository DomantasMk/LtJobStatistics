import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import SalaryChart from './SalaryContainer';
import axios from 'axios';
import MultipleSelect from './MultipleSelect';

const ChartsContainer = (props) => {
    const [techChartStates, setTechChartStates] = useState({
        series: [],
        titles: [],
    });
    const [techSalaryChartStates, setTechSalaryChartStates] = useState({
        salaryTitles:[''],
        average_salary: [0, 1],
    });

    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        //most common technologies
            axios
                .get(`/api/main/Technologies/10`)
                .then((res) => {
                    let data = {
                        series: [],
                        titles: [],
                    };

                    res.data.forEach((obj) => {
                        data.series.push(obj.count);
                        data.titles.push(obj.title);
                    });

                    setTechChartStates(data);
                })
                .catch((err) => {
                    console.log(err);
                });
                //best salary earning technologies
            axios
                .get(`/api/main/Technologies/salary/10`)
                .then((res) => {
                    let data = {
                        salaryTitles: [],
                        average_salary: [],
                    };

                    res.data.forEach((obj) => {
                        data.salaryTitles.push(obj.title);
                        data.average_salary.push(obj.average_salary);
                    });

                    setTechSalaryChartStates(data);
                })
                .catch((err) => {
                    console.log(err);
                });
            axios
                .get(`/api/main/keywords`)
                .then((res) => {
                    setKeywords(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
    }, []);

    return (
        <Container maxWidth='lg'>
                <MultipleSelect selectList={keywords} />
                <ColumnChart
                    counts={techChartStates.series}
                    titles={techChartStates.titles}
                    key={techChartStates.series}
                />

                <Box display='flex' justifyContent='center'>
                    <PieChart
                        counts={techChartStates.series}
                        titles={techChartStates.titles}
                        key={techChartStates.series}
                    />
                </Box>
                <SalaryChart
                    counts={techSalaryChartStates.average_salary}
                    titles={techSalaryChartStates.salaryTitles}
                    key={techSalaryChartStates.average_salary}
                />
        </Container>
    );
};

export default ChartsContainer;
