import React, { useEffect } from "react";
import { CourseTable } from "../containers";
import { useNavigate } from "react-router-dom";
import { useAdminStatus } from "../hooks/admin.hook";

const Courses = () => {
  const navigate = useNavigate();
  const admin = useAdminStatus();

  useEffect(() => {
    if (admin?.status === "teacher" && admin != null) {
      navigate("/groups");
    }
  }, [navigate, admin]);

  return (
    <>
      <CourseTable />
    </>
  );
};

export default Courses;
