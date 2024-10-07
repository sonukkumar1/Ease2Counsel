import express from "express";
import {
  getStudent,
  getStudents,
  getStudentDetails,
  updateDetails,
  verifyStudent,
} from "../controllers/students.js";
import { verifyToken, verifyTokenAdmin } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getStudents);
router.get("/:id", verifyToken, getStudent);
router.get("/:id/details", verifyToken, getStudentDetails);

/* UPDATE */
router.patch("/:id/verify", verifyTokenAdmin, verifyStudent);
router.patch("/:id/update", verifyToken, updateDetails);

export default router;
