import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    docName: {
      type: String,
      required: true,
    },
    docDesc: {
      type: String,
    },
    docUrl: {
      type: String,
    },
    docType: {
      template: {
        type: String,
      },
      sample: {
        type: String,
      },
    },
    docUser: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", DocumentSchema);
export default Document;
