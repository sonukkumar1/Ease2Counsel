import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { ChalkboardTeacher, CheckSquareOffset, UserList } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateDialogBox } from "../../redux/slices/app";
import EnrollmentForm from "../../sections/enrollmentForm";
import MainTable from "../../sections/MainTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.app.students);
  const open = useSelector((state) => state.app.dialogBox);

  const [defaultValues, setDefaultValues] = useState(null);
  const [disable, setDisable] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState("");
  const [registeredStudentCount, setRegisteredStudentCount] = useState(0);
  const [verifiedStudentCount, setVerifiedStudentCount] = useState(0);

  const cards = [
    {
      id: 0,
      title: "Total Students",
      number: "240",
      icon: <ChalkboardTeacher size={44} />,
    },
    {
      id: 1,
      title: "Verified Students",
      number: verifiedStudentCount,
      icon: <CheckSquareOffset size={44} />,
    },
    {
      id: 2,
      title: "Registration Form Submitted",
      number: registeredStudentCount,
      icon: <UserList size={52} />,
    },
  ];

  useEffect(() => {
    const countR = students?.filter(
      (student) => student.registrationStatus === true
    ).length;
    const countV = students?.filter(
      (student) => student.verified === true
    ).length;

    setRegisteredStudentCount(countR);
    setVerifiedStudentCount(countV);
  }, [students]);

  const handleClickAction = (studentId, isDisabled) => {
    const filteredStudents = students?.filter(
      (student) => student._id === studentId
    );

    setDefaultValues({
      programName: filteredStudents[0].officialDetails.programName,
      batchOfYear: filteredStudents[0].officialDetails.batchOfYear,
      nameHindi: filteredStudents[0].personalDetails.studentName.inHindi,
      nameEnglish: filteredStudents[0].personalDetails.studentName.inEnglish,
      picture: "",
      dob: filteredStudents[0].personalDetails.dob,
      gender: filteredStudents[0].personalDetails.gender,
      bloodGroup: filteredStudents[0].personalDetails.bloodGroup,
      pwd: filteredStudents[0].personalDetails.pwd,
      category: filteredStudents[0].personalDetails.category,
      aadhaarNum: filteredStudents[0].personalDetails.aadhaarNum,
      maritalStatus: filteredStudents[0].personalDetails.maritalStatus,
      nationality: filteredStudents[0].personalDetails.nationality,
      religion: filteredStudents[0].personalDetails.religion,
      phoneNum: filteredStudents[0].personalDetails.phoneNum,
      emailId: filteredStudents[0].personalDetails.emailId,
      hobbies: filteredStudents[0].personalDetails.hobbies,
      communAddress: {
        address: filteredStudents[0].personalDetails.communAddress.address,
        district: filteredStudents[0].personalDetails.communAddress.district,
        state: filteredStudents[0].personalDetails.communAddress.state,
        pincode: filteredStudents[0].personalDetails.communAddress.pincode,
      },
      permanentAddress: {
        address: filteredStudents[0].personalDetails.permanentAddress.address,
        district: filteredStudents[0].personalDetails.permanentAddress.district,
        state: filteredStudents[0].personalDetails.permanentAddress.state,
        pincode: filteredStudents[0].personalDetails.permanentAddress.pincode,
      },
      gateExam: {
        rollNumber: filteredStudents[0].personalDetails.gateExam.rollNum,
        score: filteredStudents[0].personalDetails.gateExam.score,
        rank: filteredStudents[0].personalDetails.gateExam.rank,
        year: filteredStudents[0].personalDetails.gateExam.year,
        branch: filteredStudents[0].personalDetails.gateExam.branch,
      },
      fatherName: filteredStudents[0].parentsDetails.father.name,
      fDesignation: filteredStudents[0].parentsDetails.father.designation,
      fPhone: filteredStudents[0].parentsDetails.father.phoneNum,
      fEmail: filteredStudents[0].parentsDetails.father.emailId,
      motherName: filteredStudents[0].parentsDetails.mother.name,
      mDesignation: filteredStudents[0].parentsDetails.mother.designation,
      mPhone: filteredStudents[0].parentsDetails.mother.phoneNum,
      mEmail: filteredStudents[0].parentsDetails.mother.emailId,
      fmAddress: filteredStudents[0].parentsDetails.father.address,
      guardianName: filteredStudents[0].parentsDetails.guardian.name,
      gPhone: filteredStudents[0].parentsDetails.guardian.phoneNum,
      gRelation: filteredStudents[0].parentsDetails.guardian.relation,
      gAddress: filteredStudents[0].parentsDetails.guardian.address,
      degree: [
        {
          name: filteredStudents[0].academicDetails.degree[0].name,
          subjects: filteredStudents[0].academicDetails.degree[0].subjects,
          board: filteredStudents[0].academicDetails.degree[0].board,
          year: filteredStudents[0].academicDetails.degree[0].year,
          division: filteredStudents[0].academicDetails.degree[0].division,
          marks: filteredStudents[0].academicDetails.degree[0].marks,
          totalMarks: filteredStudents[0].academicDetails.degree[0].totalMarks,
          grade: filteredStudents[0].academicDetails.degree[0].grade,
          degreeNum: filteredStudents[0].academicDetails.degree[0].degreeNum,
        },
        {
          name: filteredStudents[0].academicDetails.degree[1].name,
          subjects: filteredStudents[0].academicDetails.degree[1].subjects,
          board: filteredStudents[0].academicDetails.degree[1].board,
          year: filteredStudents[0].academicDetails.degree[1].year,
          division: filteredStudents[0].academicDetails.degree[1].division,
          marks: filteredStudents[0].academicDetails.degree[1].marks,
          totalMarks: filteredStudents[0].academicDetails.degree[1].totalMarks,
          grade: filteredStudents[0].academicDetails.degree[1].grade,
          degreeNum: filteredStudents[0].academicDetails.degree[1].degreeNum,
        },
        {
          name: filteredStudents[0].academicDetails.degree[2].name,
          subjects: filteredStudents[0].academicDetails.degree[2].subjects,
          board: filteredStudents[0].academicDetails.degree[2].board,
          year: filteredStudents[0].academicDetails.degree[2].year,
          division: filteredStudents[0].academicDetails.degree[2].division,
          marks: filteredStudents[0].academicDetails.degree[2].marks
            ? filteredStudents[0].academicDetails.degree[2].marks
            : "",
          totalMarks: filteredStudents[0].academicDetails.degree[2].totalMarks
            ? filteredStudents[0].academicDetails.degree[2].totalMarks
            : "",
          grade: filteredStudents[0].academicDetails.degree[2].grade,
          degreeNum: filteredStudents[0].academicDetails.degree[2].degreeNum
            ? filteredStudents[0].academicDetails.degree[2].degreeNum
            : "",
        },
      ],
    });

    dispatch(UpdateDialogBox(true));
    setDisable(isDisabled);
    setCurrentStudentId(studentId);
  };

  return (
    <>
      <Box
        p={3}
        width={`calc(100vh-300px)`}
        height="100vh"
        sx={{
          background: open
            ? "rgba(0,0,0,0.2)"
            : `linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)`,
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            background: open
              ? "rgba(0,0,0,0.2)"
              : `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
            p: "16px",
            //   px: "32px",
            overflowY: "scroll",
          }}
        >
          <Stack sx={{ height: "100%" }}>
            <Stack alignItems="flex-start">
              <Typography
                variant="h3"
                component="p"
                //   sx={{ color: (theme) => theme.palette.primary.dark }}
              >
                DASHBOARD
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Welcome to your dashboard
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="center"
              spacing={3}
              p={2}
              sx={{ height: "100%" }}
            >
              <Stack
                // direction="row"
                alignItems="center"
                justifyContent="space-around"
                spacing={4}
                sx={{ width: 320, height: "100%" }}
              >
                {cards.map((card, idx) => {
                  return (
                    <Paper
                      elevation={5}
                      sx={{
                        p: "16px",
                        width: "285px",
                        height: "220px",
                        backgroundImage: `linear-gradient(to top, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%)`,
                        backgroundBlendMode: "normal",
                      }}
                      key={card.id}
                    >
                      <Stack
                        alignItems="center"
                        height="100%"
                        justifyContent="space-around"
                        p={2}
                        sx={{ border: "2px solid #d5dee7", borderRadius: 1 }}
                      >
                        <Typography
                          variant="h1"
                          component="p"
                          sx={{ color: (theme) => theme.palette.primary.main }}
                        >
                          {card.number}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: (theme) => theme.palette.primary.darker,
                            }}
                            component="p"
                          >
                            {card.title}
                          </Typography>
                          {card.icon}
                        </Stack>
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
              <Stack
                m={2}
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
                height="100%"
              >
                <MainTable handleClickAction={handleClickAction} />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Box>
      {open && defaultValues && (
        <>
          <EnrollmentForm
            defaultValues={defaultValues}
            disabled={disable}
            currentStudent={currentStudentId}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
