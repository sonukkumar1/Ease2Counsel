import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";
import { Alert, Stack } from "@mui/material";
import RHFRadioField from "../components/hook-form/RHFRadioForm";

const ThemeChangeForm = () => {
  const ThemeSchema = Yup.object().shape({
    theme: Yup.string().required("Please select a theme"),
  });

  const defaultValues = {
    theme: "light",
  };

  const methods = useForm({
    resolver: yupResolver(ThemeSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      console.log(data);
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
         <RHFRadioField  />
      </Stack>
    </FormProvider>
  );
};

export default ThemeChangeForm;
