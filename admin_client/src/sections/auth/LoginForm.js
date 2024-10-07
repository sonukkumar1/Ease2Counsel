import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { useDispatch } from "react-redux";
import { LoginAdmin } from "../../redux/slices/auth";

const LoginForm = () => {
  const dispatch = useDispatch();

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const LoginSchema = Yup.object().shape({
    applicationId: Yup.number().required("applicationId is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(passwordRules, { message: "Please create a stronger password" }),
  });

  const defaultValues = {
    applicationId: 0,
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      dispatch(LoginAdmin(data));
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

          <RHFTextField name="applicationId" label="Application Id" />
          <RHFTextField name="password" label="Password" type="password" />
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
