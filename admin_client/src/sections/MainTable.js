import { Button } from "@mui/material";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchStudents, UpdateSidebarTab } from "../redux/slices/app";
import { useNavigate } from "react-router-dom";

const MainTable = ({ handleClickAction }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.app.students);

  const [data, setData] = useState(students);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      sorter: (a, b) => a.title - b.title,
    },
    {
      title: "Registration Status",
      dataIndex: "registration",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Verified",
      dataIndex: "verified",
      filters: [
        {
          text: "True",
          value: "true",
        },
        {
          text: "False",
          value: "false",
        },
      ],
      onFilter: (value, record) => record.verified === value,
    },
    {
      title: "Action",
      key: "action",
      sorter: false,
      render: (value, record) => (
        <>
          <Space size="small">
            <Button
              variant="text"
              onClick={() => handleClickAction(record.studentId, true)}
            >
              View
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => handlePrint(record.studentId)}
            >
              <Space>Print</Space>
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => handleClickAction(record.studentId, false)}
            >
              <Space>Edit</Space>
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FetchStudents());
  }, []);

  const handlePrint = (studentId) => {
    console.log(studentId);
    dispatch(UpdateSidebarTab(1));
    navigate(`/generate_pdf/${studentId}`)
  }

  useEffect(() => {
    const filteredStudents = students?.filter(
      (student) => student.registrationStatus
    );

    setData(
      filteredStudents?.map((stu, idx) => {
        return {
          key: stu._id,
          name: stu.personalDetails.studentName.inEnglish,
          studentId: stu._id,
          registration: `${stu.registrationStatus}`,
          verified: `${stu.verified}`,
        };
      })
    );
  }, [students]);

  const Scroll = {
    y: 540,
    x: "fixed",
  };
  return (
    <>
      {data.length !== 0 && (
        <Table
          size="large"
          loading={data ? false : true}
          sticky={true}
          pagination={true}
          columns={columns}
          dataSource={data ? data : []}
          scroll={Scroll}
        />
      )}
    </>
  );
};
export default MainTable;
