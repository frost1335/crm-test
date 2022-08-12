import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { BASE_URL } from "../../constants";
import { useAdminStatus } from "../../hooks/admin.hook";
import { useGetGroupsQuery } from "../../services/groupApi";
import { useGetStudentsQuery } from "../../services/studentApi";
import classes from "./CardLinks.module.scss";

const CardLinks = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState();
  const admin = useAdminStatus();
  useEffect(() => {
    if (admin?.status) {
      if (admin.status === "teacher")
        navigate("/groups", { state: { status: "teacher" } });
    }

    const getLeadList = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        if (admin?.status === "admin") {
          const { data } = await axios.get(
            `${BASE_URL}/api/leads/get_list`,
            config
          );
          setLeads(data);
        } else {
          setLeads([]);
        }
      } catch (e) {}
    };

    getLeadList();
  }, [admin, navigate]);

  const { data: groups } = useGetGroupsQuery();
  const { data: students } = useGetStudentsQuery();

  if (!admin) return <Loader />;

  return (
    <div className="container">
      <div className={classes.CardLinks}>
        <div className={classes.item}>
          <div className={classes.itemIn}>
            <Link to="/leads" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-user-friends`} />
                </div>
                <p className={classes.text}>Active leads</p>
                <div className={classes.count}>
                  <span>{leads?.length || "0"}</span>
                </div>
              </div>
            </Link>
            <Link to="/students" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-user-graduate ${classes.menuIcon}`} />
                </div>
                <p className={classes.text}>Active students</p>
                <div className={classes.count}>
                  <span>{students?.length || "0"}</span>
                </div>
              </div>
            </Link>
            <Link to="/groups" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-layer-group ${classes.menuIcon}`} />
                </div>
                <p className={classes.text}>Groups</p>
                <div className={classes.count}>
                  <span>{groups?.Groups?.length || "0"}</span>
                </div>
              </div>
            </Link>
          </div>
          {/* <div className={classes.itemIn}>
            <Link to="/debtors" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className="fal fa-exclamation-triangle"></i>
                </div>
                <p className={classes.text}>Debtors</p>
                <div className={classes.count}>
                  <span>109</span>
                </div>
              </div>
            </Link>
          </div> */}
        </div>
        {/* <div className={classes.item}>
          <div className={classes.itemIn}>
            <Link to="/trial" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-user-chart ${classes.menuIcon}`}></i>
                </div>
                <p className={classes.text}>In a trial lessons</p>
                <div className={classes.count}>
                  <span>109</span>
                </div>
              </div>
            </Link>
            <Link to="/paidmonth" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-handshake ${classes.menuIcon}`} />
                </div>
                <p className={classes.text}>Paid during the month</p>
                <div className={classes.count}>
                  <span>109</span>
                </div>
              </div>
            </Link>
          </div>
          <div className={classes.itemIn}>
            <Link to="/leftgroup" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-user-times ${classes.menuIcon}`} />
                </div>
                <p className={classes.text}>Left active group</p>
                <div className={classes.count}>
                  <span>109</span>
                </div>
              </div>
            </Link>
            <Link to="/lefttrial" className={classes.link}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className={`fal fa-user-slash ${classes.menuIcon}`} />
                </div>
                <p className={classes.text}>Left after trial period</p>
                <div className={classes.count}>
                  <span>109</span>
                </div>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CardLinks;
