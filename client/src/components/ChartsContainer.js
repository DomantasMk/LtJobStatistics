import React, { useEffect, useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import SalaryChart from './SalaryContainer';
import axios from 'axios';
import MultipleSelect from './MultipleSelect';
import { ChartContext } from './ChartContext';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

const ChartsContainer = (props) => {
    const classes = useStyles();
    const {
        selectedKeywords,
        setSelectedKeywords,
        selectedKeywordsSalary,
        setSelectedKeywordsSalary,
    } = useContext(ChartContext);

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
        if (selectedKeywords.length > 0) {
            top10URI = `api/main/Technologies?keywords=[${selectedKeywords.map(
                (kw) => `"${encodeURIComponent(kw)}"`
            )}]`;
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
    }, [selectedKeywords]);

    //ComponentDidMount
    useEffect(() => {
        axios
            .get(`/api/main/keywords`)
            .then((res) => {
                setKeywords(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    useEffect(() => {
        let top10SalaryURI = `api/main/Technologies/salary/10`;

        if (selectedKeywordsSalary.length > 0) {
            top10SalaryURI = `api/main/TechnologiesSalaries?keywords=[${selectedKeywordsSalary.map(
                (kw) => `"${encodeURIComponent(kw)}"`
            )}]`;
        }

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
    }, [selectedKeywordsSalary]);

    return (
        <Container maxWidth='lg'>
            <Typography
                className={classes.title}
                align='center'
                variant='h3'
                component='h3'
            >
                Most popular IT job positions in Lithuania
            </Typography>
            <Box mb={2}>
                <MultipleSelect
                    selectList={keywords}
                    setSelectedKeywords={setSelectedKeywords}
                />
            </Box>
            <ColumnChart
                counts={techChartStates.series}
                titles={techChartStates.titles}
                key={techChartStates.series}
            />

            <Box mt={5} mb={5} display='flex' justifyContent='center'>
                <PieChart
                    counts={techChartStates.series}
                    titles={techChartStates.titles}
                    key={techChartStates.series}
                />
            </Box>

            <Typography
                className={classes.title}
                align='center'
                variant='h3'
                component='h3'
            >
                Most paid IT job positions in Lithuania
            </Typography>
            <Box mb={2}>
                <MultipleSelect
                    selectList={keywords}
                    setSelectedKeywords={setSelectedKeywordsSalary}
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
