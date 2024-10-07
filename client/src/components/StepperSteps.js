import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "./hook-form";
import FormProvider from "./hook-form/FormProvider";
import RHFDropdownField from "./hook-form/RHFDropdownForm";
import * as yup from "yup";

const StepOne = (handleNext) => {
  const schema = yup.object().shape({
    programName: yup.string().required("Program Name required"),
    batchOfYear: yup
      .number()
      .typeError("You must specify a number")
      .required("Required!"),
  });

  const defaultValues = {
    programName: "",
    batchOfYear: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
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
      <Stack
        alignItems="flex-start"
        p={3}
        spacing={3}
        sx={{ width: "fit-content", height: "100%" }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", minWidth: "420px" }}
        >
          {/* <RHFTextField name="enrollmentNum" label="Enrollment Number"  /> */}
          <RHFTextField name="programName" label="Program Name" />
          <RHFTextField name="batchOfYear" label="Batch Of Year" />
        </Stack>
        <Button color="primary" size="large" type="submit" onClick={handleNext} >
          Next
        </Button>
      </Stack>
    </FormProvider>
  );
};

const options = [
  {
    value: "male",
    label: "male",
  },
  {
    value: "female",
    label: "female",
  },
];

const options2 = [
  {
    value: true,
    label: "true",
  },
  {
    value: false,
    label: "false",
  },
];

const options3 = [
  {
    value: "ST",
    label: "ST",
  },
  {
    value: "SC",
    label: "SC",
  },
  {
    value: "OBC",
    label: "OBC",
  },
  {
    value: "GEN",
    label: "GEN",
  },
];

const options4 = [
  {
    value: "india",
    label: "India",
  },
];

const State = [
  {
    value: "andhra pradesh",
    label: "Andhra Pradesh",
  },
  {
    value: "arunachal pradesh",
    label: "Arunachal Pradesh",
  },
  {
    value: "assam",
    label: "Assam",
  },
  {
    value: "bihar",
    label: "Bihar",
  },
  {
    value: "chhattisgarh",
    label: "Chhattisgarh",
  },
  {
    value: "goa",
    label: "Goa",
  },
  {
    value: "gujarat",
    label: "Gujarat",
  },
  {
    value: "haryana",
    label: "Haryana",
  },
  {
    value: "himachal pradesh",
    label: "Himachal Pradesh",
  },
  {
    value: "jharkhand",
    label: "Jharkhand",
  },
  {
    value: "karnataka",
    label: "Karnataka",
  },
  {
    value: "kerala",
    label: "Kerala",
  },
  {
    value: "madhya pradesh",
    label: "Madhya Pradesh",
  },
  {
    value: "maharashtra",
    label: "Maharashtra",
  },
  {
    value: "manipur",
    label: "Manipur",
  },
  {
    value: "meghalaya",
    label: "Meghalaya",
  },
  {
    value: "mizoram",
    label: "Mizoram",
  },
  {
    value: "nagaland",
    label: "Nagaland",
  },
  {
    value: "odisha",
    label: "Odisha",
  },
  {
    value: "punjab",
    label: "Punjab",
  },
  {
    value: "rajasthan",
    label: "Rajasthan",
  },
  {
    value: "sikkim",
    label: "Sikkim",
  },
  {
    value: "tamil nadu",
    label: "Tamil Nadu",
  },
  {
    value: "telangana",
    label: "Telangana",
  },
  {
    value: "tripura",
    label: "Tripura",
  },
  {
    value: "uttar pradesh",
    label: "Uttar Pradesh",
  },
  {
    value: "uttarakhand",
    label: "Uttarakhand",
  },
  {
    value: "west Bengal",
    label: "West Bengal",
  },
  {
    value: "andaman and nicobar islands",
    label: "Andaman and Nicobar Islands",
  },
  {
    value: "chandigarh",
    label: "Chandigarh",
  },
  {
    value: "dadra nagar haveli and daman diu",
    label: "Dadra Nagar Haveli and Daman Diu",
  },
  {
    value: "delhi",
    label: "Delhi",
  },
  {
    value: "jammu and kashmir",
    label: "Jammu and Kashmir",
  },
  {
    value: "ladakh",
    label: "Ladakh",
  },
  {
    value: "lakshadweep",
    label: "Lakshadweep",
  },
  {
    value: "puducherry",
    label: "Puducherry",
  },
];
const StepTwo = () => {
  return (
    <Box p={10} sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <Stack
        spacing={3}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%" }}
        // useFlexGap
        // flexWrap="wrap"
      >
        {/* Name */}
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Student Name:
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="nameEnglish"
              label="Name (English)"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="nameHindi"
              label="Name (Hindi)"
            />
          </Stack>
        </Stack>

        <Stack spacing={3} direction="row" alignItems="center">
          <RHFTextField
            name="dob"
            label=""
            type="date"
            sx={{ minWidth: "240px", maxWidth: "320px" }}
          />
          <RHFDropdownField
            variant="standard"
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="gender"
            label="Gender"
            options={options}
          />
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="bloodGroup"
            label="Blood Group"
          />
          <RHFDropdownField
            variant="standard"
            name="pwd"
            label="PwD Category"
            options={options2}
            sx={{ minWidth: "240px", maxWidth: "320px" }}
          />
        </Stack>

        <Stack spacing={3} direction="row" alignItems="center">
          <RHFDropdownField
            variant="standard"
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="category"
            label="Category"
            options={options3}
          />
          <RHFDropdownField
            variant="standard"
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="maritalStatus"
            label="Marital Status"
            options={options2}
          />
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="religion"
            label="Religion"
          />
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="nationality"
            label="Nationality"
          />
        </Stack>

        <Stack spacing={3} direction="row" alignItems="flex-start">
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="aadhaarNum"
            label="Aadhaar Number"
          />
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="phoneNum"
            label="Phone Number"
          />
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="emailId"
            label="Email"
          />
          <RHFTextField
            sx={{ minWidth: "240px", maxWidth: "320px" }}
            name="hobbies"
            label="Hobbies"
            multiline
          />
        </Stack>

        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Communication address:
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="communAddress.address"
              label="Address"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="communAddress.district"
              label="District"
            />
            <RHFDropdownField
              variant="standard"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="communAddress.state"
              label="State"
              options={State}
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="communAddress.pincode"
              label="Pincode"
            />
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Permanent address:
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="permanent.address"
              label="Address"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="permanent.district"
              label="District"
            />
            <RHFDropdownField
              variant="standard"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="permanent.state"
              label="State"
              options={State}
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="permanent.pincode"
              label="Pincode"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
const StepThree = ({ control }) => {
  return (
    <Box p={10} sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <Stack
        spacing={3}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%" }}
        // useFlexGap
        // flexWrap="wrap"
      >
        {/* Father */}
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Father's Details:
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="fatherName"
              label="Name"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="fDesignation"
              label="Designation"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="fPhone"
              label="Phone Number"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="fEmail"
              label="Email"
            />
          </Stack>
        </Stack>

        {/* Mother */}
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Mother's Details:
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="motherName"
              label="Name"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="mDesignation"
              label="Designation"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="mPhone"
              label="Phone Number"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="mEmail"
              label="Email"
            />
          </Stack>
        </Stack>

        <RHFTextField
          sx={{ minWidth: "240px", maxWidth: "320px" }}
          name="fmAddress"
          label="Address"
        />

        {/* Mother */}
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Guardian's Details:
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="guardianName"
              label="Name"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="gPhone"
              label="Phone Number"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="gRelation"
              label="Relation"
            />
            <RHFTextField
              sx={{ minWidth: "240px", maxWidth: "320px" }}
              name="gAddress"
              label="Address"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
const StepFour = ({ control }) => {
  return (
    <Box p={10} sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <Stack
        spacing={2}
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ width: "100%" }}
      >
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            High School Details:
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            useflexgap="true"
            flexWrap="wrap"
            gap={3}
          >
            <RHFTextField
              name="degree[0].name"
              label="Educational Qualification"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
            />
            <RHFTextField
              name="degree[0].subjects"
              label="Subjects"
              sx={{ minWidth: "240px", maxWidth: "280px" }}
            />
            <RHFTextField
              name="degree[0].board"
              label="Board / University"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
            />
            <RHFTextField
              name="degree[0].year"
              label="Year"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[0].division"
              label="Division"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[0].marks"
              label="Marks"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[0].totalMarks"
              label="Total Marks"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[0].grade"
              label="Grade / Percentage"
              sx={{ minWidth: "100px", maxWidth: "170px" }}
            />
            <RHFTextField
              name="degree[0].degreeNum"
              label="Certificate / Degree No."
              sx={{ minWidth: "240px", maxWidth: "280px" }}
            />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Intermediate Details:
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            useflexgap="true"
            flexWrap="wrap"
            gap={3}
          >
            <RHFTextField
              name="degree[1].name"
              label="Educational Qualification"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
            />
            <RHFTextField
              name="degree[1].subjects"
              label="Subjects"
              sx={{ minWidth: "240px", maxWidth: "280px" }}
            />
            <RHFTextField
              name="degree[1].board"
              label="Board / University"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
            />
            <RHFTextField
              name="degree[1].year"
              label="Year"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[1].division"
              label="Division"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[1].marks"
              label="Marks"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[1].totalMarks"
              label="Total Marks"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[1].grade"
              label="Grade / Percentage"
              sx={{ minWidth: "100px", maxWidth: "170px" }}
            />
            <RHFTextField
              name="degree[1].degreeNum"
              label="Certificate / Degree No."
              sx={{ minWidth: "240px", maxWidth: "280px" }}
            />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 500 }}
          >
            Graduation Details:
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            useflexgap="true"
            flexWrap="wrap"
            gap={3}
          >
            <RHFTextField
              name="degree[2].name"
              label="Educational Qualification"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
            />
            <RHFTextField
              name="degree[2].subjects"
              label="Subjects"
              sx={{ minWidth: "240px", maxWidth: "280px" }}
            />
            <RHFTextField
              name="degree[2].board"
              label="Board / University"
              sx={{ minWidth: "240px", maxWidth: "320px" }}
            />
            <RHFTextField
              name="degree[2].year"
              label="Year"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[2].division"
              label="Division"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[2].marks"
              label="Marks"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[2].totalMarks"
              label="Total Marks"
              sx={{ minWidth: "100px", maxWidth: "120px" }}
            />
            <RHFTextField
              name="degree[2].grade"
              label="Grade / Percentage"
              sx={{ minWidth: "100px", maxWidth: "170px" }}
            />
            <RHFTextField
              name="degree[2].degreeNum"
              label="Certificate / Degree No."
              sx={{ minWidth: "240px", maxWidth: "280px" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
const StepFive = ({ control }) => {
  return <>Step Five</>;
};

export { StepOne, StepFive };
