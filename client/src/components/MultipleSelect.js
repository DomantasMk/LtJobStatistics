import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Checkbox, TextField } from "@material-ui/core";

const MultipleSelect = ({ selectList, setSelectedKeywords }) => {
  const handleChange = (value) => {
    setSelectedKeywords(value);
  };

  return (
    <Autocomplete
      multiple
      options={selectList}
      disableCloseOnSelect
      onChange={(e, value) => handleChange(value)}
      getOptionLabel={(option) => option}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option}
        </React.Fragment>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Filter"
          placeholder="Tech"
        />
      )}
    />
  );
};

MultipleSelect.propTypes = {
  selectList: PropTypes.array.isRequired,
};

export default MultipleSelect;
