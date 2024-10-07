import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

RHFTextAreaField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node,
};
export default function RHFTextAreaField({ name, helperText, ...other }) {
    const { control } = useFormContext();
    return (
        <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            multiline
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}
          />
        )}
      />
  )
}
