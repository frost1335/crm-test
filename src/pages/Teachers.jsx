import React, { useEffect } from "react";
import { TeacherTable } from "../containers";
import { useNavigate } from "react-router-dom";
import { useAdminStatus } from "../hooks/admin.hook";

const Teachers = () => {
  const navigate = useNavigate();
  const admin = useAdminStatus();

  useEffect(() => {
    if (admin?.status === "teacher" && admin != null) {
      navigate("/groups");
    }
  }, [navigate, admin]);

  return (
    <>
      <TeacherTable />
    </>
  );
};

export default Teachers;
