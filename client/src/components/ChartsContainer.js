import React, { useEffect, useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import SalaryChart from './SalaryContainer';
import axios from 'axios';
import MultipleSelect from './MultipleSelect';
import { ChartContext } from './ChartContext';

const ChartsContainer = (props) => {
    const { selectedKeywords, setSelectedKeywords } = useContext(ChartContext);

    const [techChartStates, setTechChartStates] = useState({
        series: [],
        titles: [],
    });
    const [techSalaryChartStates, setTechSalaryChartStates] = useState({
        salaryTitles: [''],
        average_salary: [0, 1],
    });

    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        let top10URI = `api/main/Technologies/10`;
        let top10SalaryURI =`api/main/Technologies/salary/10`;
        if(selectedKeywords.length > 0){
            top10URI = `api/main/Technologies?keywords=[${selectedKeywords.map(kw => `"${encodeURIComponent(kw)}"`)}]`;
            top10SalaryURI =`api/main/TechnologiesSalaries?keywords=[${selectedKeywords.map(kw => `"${encodeURIComponent(kw)}"`)}]`;
        }
        //most common technologies
        axios
            .get(top10URI)
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
            .get(top10SalaryURI)
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
    }, [selectedKeywords]);

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
