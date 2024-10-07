import React from 'react';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  Stack,
} from "@mui/material";
import { RHFTextField } from '../components/hook-form';

const QuoraForm = () => {
    
    
  const RegisterSchema = Yup.object().shape({
    query: Yup.string().required("Query is required"),
  });

  const defaultValues = {
    query: "What's your query",
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
      console.log(data)
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
      <Stack spacing={3} alignItems="center" >
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField multiline rows={4} name="query" label="Query" placeholder="What's your query" />

        <Button
        //   fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            width: 120,
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
          Post
        </Button>
      </Stack>
    </FormProvider>
  )
}

export default QuoraForm