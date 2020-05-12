import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import axios from 'axios';
import MultipleSelect from './MultipleSelect';

const ChartsContainer = (props) => {
    const [techChartStates, setTechChartStates] = useState({
        series: [0, 0],
        titles: ['', ''],
    });

    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
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
        </Container>
    );
};

export default ChartsContainer;
