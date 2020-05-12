import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
    Chip,
    MenuItem,
} from '@material-ui/core';

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
    const [selectedData, setSelectedData] = useState([]);

    const handleChange = (event) => {
        setSelectedData(event.target.value);
    };

    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='chart-select-label'>Chip</InputLabel>
            <Select
                labelId='chart-select-label'
                multiple
                id='chart-select'
                value={selectedData}
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
