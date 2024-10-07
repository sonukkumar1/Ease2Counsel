import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../components/hook-form";
import RHFTextAreaField from "../components/hook-form/RHFTextAreaForm";

const ContactForm = () => {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    applicationId: Yup.string().required("Application Id is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    query: Yup.string().required("Query is required"),
  });

  const defaultValues = {
    name: "",
    applicationId: "",
    email: "",
    query: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="applicationId" label="Application Id" />
        </Stack>

        <RHFTextField name="email" label="Email" />
        <RHFTextAreaField rows={4} name="query" label="Your Query" />

        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: (theme) => theme.palette.primary.main,
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ContactForm;
