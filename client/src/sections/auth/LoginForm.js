import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import dayjs from "dayjs";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { useDispatch } from "react-redux";
import { LoginStudent } from "../../redux/slices/auth";

const LoginForm = () => {
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    applicationId: Yup.number().required("applicationId is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Future date not allowed"),
  });

  const defaultValues = {
    applicationId: "",
    dob: dayjs(new Date()).format("YYYY-MM-DD"),
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      const formattedData = {
        applicationId: data.applicationId,
        dob: dayjs(data.dob).format("DD-MM-YYYY"),
      };
      dispatch(LoginStudent(formattedData));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} sx={{ height: "100%", minWidth: "300px" }}>
        <Stack mt={5} spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            name="applicationId"
            label="Application Id"
            type="password"
          />
          <RHFTextField
            name="dob"
            label="Date of Birth"
            type="date"
            inputvariant="outlined"
          />
        </Stack>

        <Button
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          LOGIN
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default LoginForm;
