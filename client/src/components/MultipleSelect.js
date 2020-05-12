import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
    Chip,
    MenuItem,
} from '@material-ui/core';
import { ChartContext } from './ChartContext';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

const MultipleSelect = ({ selectList }) => {
    const { selectedKeywords, setSelectedKeywords } = useContext(ChartContext);

    const handleChange = (event) => {
        setSelectedKeywords(event.target.value);
    };

    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='chart-select-label'>Filter</InputLabel>
            <Select
                labelId='chart-select-label'
                multiple
                id='chart-select'
                value={selectedKeywords}
                onChange={(e) => handleChange(e)}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                            />
                        ))}
                    </div>
                )}
                //MenuProps={MenuProps}
            >
                {selectList.map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

MultipleSelect.propTypes = {
    selectList: PropTypes.array.isRequired,
};

export default MultipleSelect;
