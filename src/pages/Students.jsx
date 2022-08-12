import React, { useEffect } from "react";
import { StudentsTable } from "../containers";
import { useNavigate } from "react-router-dom";
import { useAdminStatus } from "../hooks/admin.hook";

const Students = () => {
  const navigate = useNavigate();
  const admin = useAdminStatus();

  // useEffect(() => {
  //   if (admin?.status === "teacher" && admin !== null) {
  //     navigate("/groups");
  //   }
  //   return () => true;
  // }, [navigate, admin]);

  return (
    <>
      <StudentsTable />
    </>
  );
};

export default Students;
