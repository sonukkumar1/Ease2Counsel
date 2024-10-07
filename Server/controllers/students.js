import Student from "../models/Student.js";
import Document from "../models/Document.js";

export const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select(
      "officialDetials personalDetails parentsDetails academicDetails"
    );

    res.status(200).json({
      status: "success",
      message: "Student's detail found successfully",
      data: student,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().select(
      "_id officialDetails personalDetails parentsDetails academicDetails documents registrationStatus verified"
    );

    res.status(200).json({
      status: "success",
      message: "Students found successfully!",
      data: students,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("documents");;

    if (!student)
      return res.status(404).json({
        status: "error",
        message: "Student doesn't exist!",
      });

    const filtered_student = {
      name: student.personalDetails.studentName.inEnglish,
      picture: student.personalDetails.picture,
      documents: student.documents,
      role: student.role,
      registrationStatus: student.registrationStatus,
    };

    res.status(200).json({
      status: "success",
      message: "Student found successfully!",
      data: filtered_student,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const verifyStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student)
      return res.status(404).json({
        status: "error",
        message: "Student doesn't exist!",
      });

    student.verified = true;

    student.save();

    res.status(201).json({
      status: "success",
      message: "Student Verified successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const student = await Student.findById(id);

    if (!student)
      return res.status(404).json({
        status: "error",
        message: "Student doesn't exist!",
      });

    const updated_student = await Student.findByIdAndUpdate(id, formData, {
      new: true,
      validateModifiedOnly: true,
    });

    updated_student.registrationStatus = true;
    updated_student.verified = false;
    updated_student.save();

    res.status(201).json({
      status: "success",
      data: updated_student,
      message: "Student Updated Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
