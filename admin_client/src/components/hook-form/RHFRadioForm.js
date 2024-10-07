import React from "react";

import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

RHFRadioField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

const themeOptions = ["light", "dark", "system default"];

export default function RHFRadioField({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue="light"
      render={({ value, onChange }) => (
        <RadioGroup value={value} onChange={onChange}>
          {themeOptions.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      )}
      name="theme"
      control={control}
    />
  );
}
