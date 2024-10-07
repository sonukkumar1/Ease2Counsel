import express from "express";
import { deleteDoc, getBaseDocs, uploadDoc } from "../controllers/documents.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/base", verifyToken, getBaseDocs);

/* POST */
router.post("/:userId", verifyToken, uploadDoc);

/* DELETE */
router.delete("/:id", verifyToken, deleteDoc);

export default router;
