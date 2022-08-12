import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Settings.scss";

const Settings = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.search.replace("?", "") === "settings") {
      setOpen(true);
    } else setOpen(false);
  }, [location]);

  return (
    <>
      <div
        className={`settings-back ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      ></div>
      <div className={`Settings ${open ? "open" : ""}`}>settings</div>
    </>
  );
};

export default Settings;
