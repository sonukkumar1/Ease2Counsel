import React from "react";
import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

RHFDropdownField.prototype = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  defaultValue: PropTypes.any,
};

export default function RHFDropdownField({
  name,
  label,
  helperText,
  options,
  defaultValue,
  ...props
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth {...props}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
