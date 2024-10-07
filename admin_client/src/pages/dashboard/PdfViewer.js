import React, { useEffect, useState } from "react";
import Pdf from "./Pdf";
import { PDFViewer } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSidebarTab } from "../../redux/slices/app";

const PdfViewer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.app);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (
      !document.location.pathname ||
      document.location.pathname === "/generate_pdf"
    ) {
      dispatch(UpdateSidebarTab(0));
      navigate("/home");
    }

    const filteredStudent = students?.filter(
      (student) =>
        student._id ===
        document.location.pathname
          .slice(14, document.location.pathname.length)
          .trimStart()
    );

    setData(filteredStudent[0])
  }, []);


  return (
    <PDFViewer
      showToolbar={true}
      width={"100%"}
      style={{
        margin: "15px",
        borderRadius: "8px",
        boxShadow: "0 0 16px rgba(0,0,0,0.2)",
      }}
    >
      <Pdf data={data} />
    </PDFViewer>
  );
};

export default PdfViewer;
