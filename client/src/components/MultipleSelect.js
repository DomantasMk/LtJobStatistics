import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
    Input,
    Chip,
    MenuItem,
} from '@material-ui/core';
const keywords = ['javascript', 'c#', 'java'];

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

const MultipleSelect = (props) => {
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
                input={<Input id='select-multiple-chip' />}
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
                {keywords.map((keyword) => (
                    <MenuItem key={keyword} value={keyword}>
                        {keyword}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

MultipleSelect.propTypes = {};

export default MultipleSelect;
