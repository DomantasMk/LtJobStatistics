import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Checkbox, TextField } from '@material-ui/core';
import { ChartContext } from './ChartContext';

const useStyles = makeStyles((theme) => ({
    autocomplete: {
        width: '500px',
    },
}));

const MultipleSelect = ({ selectList }) => {
    const { selectedKeywords, setSelectedKeywords } = useContext(ChartContext);

    const handleChange = (event, value) => {
        setSelectedKeywords(value);
    };

    const classes = useStyles();
    return (
        <Autocomplete
            multiple
            id='checkboxes'
            options={selectList}
            disableCloseOnSelect
            onChange={(e, value) => handleChange(e, value)}
            getOptionLabel={(option) => option}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option}
                </React.Fragment>
            )}
            style={{ width: '500px' }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant='outlined'
                    label='Filter'
                    placeholder='Tech'
                />
            )}
        />
    );
};

MultipleSelect.propTypes = {
    selectList: PropTypes.array.isRequired,
};

export default MultipleSelect;
