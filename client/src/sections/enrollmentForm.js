import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFTextField } from "../components/hook-form";
import RHFDropdownField from "../components/hook-form/RHFDropdownForm";
import FormProvider from "../components/hook-form/FormProvider";
import { useDispatch } from "react-redux";
import { PatchStudent } from "../redux/slices/auth";
import storage from "../firebaseConfig.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
    label: "Yes",
  },
  {
    value: false,
    label: "No",
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

const EnrollmentForm = () => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    programName: yup.string().required("Program Name required"),
    batchOfYear: yup
      .number()
      .typeError("You must specify a number")
      .required("Required!"),
    nameHindi: yup.string().required("Required!"),
    nameEnglish: yup.string().required("Required!"),
    picture: yup
      .mixed()
      //   .test("fileSize", "The file is too large", (value) => {
      //       console.log(value)
      //       if (!value) return true; // attachment is optional
      //       return value.size <= 1024 * 1024 * 5; // 5 MB
      //     })
      .required("Picture is required"),
    //   .test("fileType", "Only image files are allowed", (value) => {
    //     if (!value) return true; // attachment is optional
    //     return value.type.startsWith("image/");
    //   }),
    dob: yup.date().required("Required!"),
    gender: yup.string().required("Required!"),
    bloodGroup: yup.string(),
    pwd: yup.boolean().required("Required!"),
    category: yup.string().required("Required!"),
    aadhaarNum: yup
      .number()
      .typeError("You must specify a number")
      .required("Required!"),
    maritalStatus: yup.boolean().required("Required!"),
    nationality: yup.string().required("Required!"),
    religion: yup.string().required("Required!"),
    phoneNum: yup
      .string()
      .required("Phone number required")
      .matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
    emailId: yup.string().email("Invalid email format").required("Required!"),
    hobbies: yup
      .string()
      .min(8, "Too Short!")
      .max(30, "Max 30 characters allowed."),
    communAddress: yup.object().shape({
      address: yup.string().required("Required!"),
      district: yup.string().required("Required!"),
      state: yup.string().required("Required!"),
      pincode: yup
        .string()
        .matches(/^\d{6}$/, "Zip code is not valid")
        .typeError("You must specify a number")
        .required("Required!"),
    }),
    permanentAddress: yup.object().shape({
      address: yup.string().required("Required!"),
      district: yup.string().required("Required!"),
      state: yup.string().required("Required!"),
      pincode: yup
        .string()
        .matches(/^\d{6}$/, "Zip code is not valid")
        .typeError("You must specify a number")
        .required("Required!"),
    }),
    gateExam: yup.object().shape({
      rollNumber: yup.string(),
      score: yup.number(),
      rank: yup.string(),
      year: yup.number(),
      branch: yup.string(),
    }),
    fatherName: yup.string(),
    fDesignation: yup.string(),
    fPhone: yup
      .string("You must specify a number")
      .matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
    fEmail: yup.string().email("Invalid email format"),
    motherName: yup.string(),
    mDesignation: yup.string(),
    mPhone: yup
      .string("You must specify a number")
      .matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
    mEmail: yup.string().email("Invalid email format"),
    fmAddress: yup.string().max(255, "Max 255 characters allowed."),
    guardianName: yup.string(),
    gPhone: yup.string(), //.matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
    gRelation: yup.string(),
    gAddress: yup.string().max(255, "Max 255 characters allowed."),
    degree: yup.array().of(
      yup.object().shape({
        name: yup.string(),
        subjects: yup.string(),
        board: yup.string(),
        year: yup.number("You must specify a number"),
        division: yup.string(),
        marks: yup.number("You must specify a number"),
        totalMarks: yup.number("You must specify a number"),
        grade: yup.string(),
        degreeNum: yup.number("You must specify a number"),
      })
    ),
  });

  const defaultValues = {
    enrollmentNum: "",
    programName: "",
    batchOfYear: "",
    nameHindi: "",
    nameEnglish: "",
    picture: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    pwd: "",
    category: "",
    aadhaarNum: "",
    maritalStatus: "",
    nationality: "",
    religion: "",
    phoneNum: "",
    emailId: "",
    hobbies: "",
    communAddress: {
      address: "",
      district: "",
      state: "",
      pincode: "",
    },
    permanentAddress: {
      address: "",
      district: "",
      state: "",
      pincode: "",
    },
    gateExam: {
      rollNumber: "",
      score: 0,
      rank: "",
      year: 0,
      branch: "",
    },
    fatherName: "",
    fDesignation: "",
    fPhone: "",
    fEmail: "",
    motherName: "",
    mDesignation: "",
    mPhone: "",
    mEmail: "",
    fmAddress: "",
    guardianName: "",
    gPhone: "",
    gRelation: "",
    gAddress: "",
    degree: [
      {
        name: "",
        subjects: "",
        board: "",
        year: "",
        division: "",
        marks: "",
        totalMarks: "",
        grade: "",
        degreeNum: "",
      },
    ],
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

  const [percent, setPercent] = useState(0);
  const [picUrl, setPicUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    event.target.defaultValue = file.name;
    console.log(event)
  };

  const onSubmit = async (data) => {
    try {
      if (data.picture) setFile(data.picture);
      console.log(file)
      if (file) {
        let name = data.nameEnglish.split(" ");
        const storageRef = ref(storage, `/files/${name[0]}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ); // update progress
              setPercent(progress);
              console.log(percent)
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setPicUrl(url);
            });
          }
          );
          console.log(picUrl)
      }
      // submit data to backend
      const refined_Data = {
        officialDetails: {
          programName: data.programName,
          batchOfYear: data.batchOfYear,
        },
        personalDetails: {
          studentName: {
            inEnglish: data.nameEnglish,
            inHindi: data.nameHindi,
          },
          picture: picUrl,
          dob: data.dob,
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          pwd: data.pwd,
          category: data.category,
          aadhaarNum: data.aadhaarNum,
          maritalStatus: data.maritalStatus,
          nationality: data.nationality,
          religion: data.religion,
          phoneNum: data.phoneNum,
          emailId: data.emailId,
          hobbies: data.hobbies,
          communAddress: {
            address: data.communAddress.address,
            district: data.communAddress.district,
            state: data.communAddress.state,
            pincode: data.communAddress.pincode,
          },
          permanentAddress: {
            address: data.permanentAddress.address,
            district: data.permanentAddress.district,
            state: data.permanentAddress.state,
            pincode: data.permanentAddress.pincode,
          },
          gateExam: {
            rollNum: data.gateExam.rollNumber,
            score: data.gateExam.score,
            rank: data.gateExam.rank,
            year: data.gateExam.year,
            branch: data.gateExam.branch,
          },
        },
        parentsDetails: {
          father: {
            name: data.fatherName,
            designation: data.fDesignation,
            phoneNum: data.fPhone,
            emailId: data.fEmail,
            address: data.fmAddress,
          },
          mother: {
            name: data.motherName,
            designation: data.mDesignation,
            phoneNum: data.mPhone,
            emailId: data.mEmail,
          },
          guardian: {
            name: data.guardianName ? data.guardianName : "",
            phoneNum: data.gPhone ? data.gPhone : "",
            relation: data.gRelation ? data.gRelation : "",
            address: data.gAddress ? data.gAddress : "",
          },
        },
        academicDetails: {
          degree: [
            {
              name: data.degree[0].name,
              subjects: data.degree[0].subjects,
              board: data.degree[0].board,
              year: data.degree[0].year,
              division: data.degree[0].division,
              marks: data.degree[0].marks,
              totalMarks: data.degree[0].totalMarks,
              grade: data.degree[0].grade,
              degreeNum: data.degree[0].degreeNum,
            },
            {
              name: data.degree[1].name,
              subjects: data.degree[1].subjects,
              board: data.degree[1].board,
              year: data.degree[1].year,
              division: data.degree[1].division,
              marks: data.degree[1].marks,
              totalMarks: data.degree[1].totalMarks,
              grade: data.degree[1].grade,
              degreeNum: data.degree[1].degreeNum,
            },
            {
              name: data.degree[2].name ? data.degree[2].name : "",
              subjects: data.degree[2].subjects ? data.degree[2].subjects : "",
              board: data.degree[2].board ? data.degree[2].board : "",
              year: data.degree[2].year ? data.degree[2].year : "",
              division: data.degree[2].division ? data.degree[2].division : "",
              marks: data.degree[2].marks ? data.degree[2].marks : "",
              totalMarks: data.degree[2].totalMarks
                ? data.degree[2].totalMarks
                : "",
              grade: data.degree[2].grade ? data.degree[2].grade : "",
              degreeNum: data.degree[2].degreeNum
                ? data.degree[2].degreeNum
                : "",
            },
          ],
        },
        registrationStatus: true,
      };

        dispatch(PatchStudent(refined_Data));
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
    <Paper
      elevation={4}
      sx={{
        height: `calc(100vh - 116px)`,
        padding: "64px",
        paddingTop: "32px",
        overflowY: "scroll",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack spacing={3}>
          <Stack spacing={3}>
            <Typography variant="subtitle1" component="p">
              Official Details
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              alignItems="flex-start"
              justifyContent="center"
              sx={{ height: "max-content", maxWidth: "820px" }}
            >
              <RHFTextField name="programName" label="Program Name" />
              <RHFTextField name="batchOfYear" label="Batch Of Year" />
              <RHFTextField
                name="picture"
                helperText="size must be less than 5MB"
                type="file"
                label=""
                inputProps={{ accept: "image/*" }}
              />
            </Stack>
          </Stack>

          <Stack spacing={3}>
            <Typography variant="subtitle1" component="p">
              Personal Details
            </Typography>
            <Stack
              spacing={3}
              alignItems="flex-start"
              justifyContent="center"
              sx={{ width: "100%" }}
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

              <Stack spacing={3} direction="row" alignItems="flex-start">
                <RHFTextField
                  name="dob"
                  label=""
                  type="date"
                  sx={{ minWidth: "240px", maxWidth: "320px" }}
                />
                <RHFDropdownField
                  variant="filled"
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
                  variant="filled"
                  name="pwd"
                  label="PwD Category"
                  options={options2}
                  sx={{ minWidth: "240px", maxWidth: "320px" }}
                />
              </Stack>

              <Stack spacing={3} direction="row" alignItems="center">
                <RHFDropdownField
                  variant="filled"
                  sx={{ minWidth: "240px", maxWidth: "320px" }}
                  name="category"
                  label="Category"
                  options={options3}
                />
                <RHFDropdownField
                  variant="filled"
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
                    variant="filled"
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
                    name="permanentAddress.address"
                    label="Address"
                  />
                  <RHFTextField
                    sx={{ minWidth: "240px", maxWidth: "320px" }}
                    name="permanentAddress.district"
                    label="District"
                  />
                  <RHFDropdownField
                    variant="filled"
                    sx={{ minWidth: "240px", maxWidth: "320px" }}
                    name="permanentAddress.state"
                    label="State"
                    options={State}
                  />
                  <RHFTextField
                    sx={{ minWidth: "240px", maxWidth: "320px" }}
                    name="permanentAddress.pincode"
                    label="Pincode"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={3}>
            <Typography variant="subtitle1" component="p">
              Parent's Details
            </Typography>
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

              {/* Guardian */}
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
          </Stack>

          <Stack spacing={3}>
            <Typography variant="subtitle1" component="p">
              Academic Details
            </Typography>
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
                  alignItems="flex-start"
                  useflexgap="true"
                  flexWrap="wrap"
                  gap={3}
                >
                  <RHFTextField
                    name="degree[0].name"
                    label="Educational Qualification"
                    defaultValues="High School"
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
                  alignItems="flex-start"
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
                  alignItems="flex-start"
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
              <Stack spacing={1}>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{ fontWeight: 500 }}
                >
                  Gate Exam Details:
                </Typography>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  useflexgap="true"
                  flexWrap="wrap"
                  gap={3}
                >
                  <RHFTextField
                    name="gateExam.rollNumber"
                    label="Roll Number"
                    sx={{ minWidth: "240px", maxWidth: "320px" }}
                  />
                  <RHFTextField
                    name="gateExam.score"
                    label="Score"
                    sx={{ minWidth: "240px", maxWidth: "280px" }}
                  />
                  <RHFTextField
                    name="gateExam.rank"
                    label="Rank"
                    sx={{ minWidth: "240px", maxWidth: "320px" }}
                  />
                  <RHFTextField
                    name="gateExam.year"
                    label="Year"
                    sx={{ minWidth: "100px", maxWidth: "120px" }}
                  />
                  <RHFTextField
                    name="gateExam.branch"
                    label="Branch"
                    sx={{ minWidth: "100px", maxWidth: "120px" }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ width: "160px" }}
          >
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

export default EnrollmentForm;
