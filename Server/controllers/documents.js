import Document from "../models/Document.js";
import Student from "../models/Student.js";

export const getBaseDocs = async (req, res) => {
  try {
    const documents = await Document.find({
      $or: [{ docUrl: "" }],
    });

    res.status(200).json({
      status: "success",
      message: "Document found successfully!",
      data: documents,
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const uploadDoc = async (req, res) => {
  try {
    const { userId } = req.params;
    const { docName, docUrl } = req.body;
    const user = await Student.findById(userId);
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User doesn't exist!",
      });

    const query = { docDesc: "uploaded", docName: docName };

    const doc = await Document.find(query);

    console.log(doc);

    if (doc.length != 0) {
      return res.status(400).json({
        status: "error",
        message: "Alreday uploaded! Try uploading different document.",
      });
    }

    const newDoc = new Document({
      docName,
      docDesc: "uploaded",
      docUrl,
      docUser: userId,
    });

    user.documents = [...user.documents, newDoc._id];

    await newDoc.save();
    await user.save();

    res.status(201).json({
      status: "success",
      message: "Document saved successfully!",
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = Document.findById(id);
    if (!doc)
      return res.status(404).json({
        status: "error",
        message: "Document not found",
      });

    await Document.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
