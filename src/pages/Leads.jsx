import React, { useEffect } from "react";
import { LeadTable } from "../containers";
import { useNavigate } from "react-router-dom";
import { useAdminStatus } from "../hooks/admin.hook";

const Leads = () => {
  const navigate = useNavigate();
  const admin = useAdminStatus();

  useEffect(() => {
    if (admin?.status === "teacher" && admin != null) {
      navigate("/groups");
    }
  }, [navigate, admin]);

  return (
    <>
      <LeadTable />
    </>
  );
};

export default Leads;
