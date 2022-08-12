import React from "react";
import { Link, useParams } from "react-router-dom";
import { formatter } from "../../constants";
import { useGetGroupsQuery } from "../../services/groupApi";
import {
  useGetStudentQuery,
  useDeleteStudentMutation,
} from "../../services/studentApi";
import { useNavigate } from "react-router-dom";
import { PaymentDrawer, StudentDrawer } from "../Drawers";
import Loader from "../Loader/Loader";

import "./StudentCard.scss";
import { useGetAdminQuery } from "../../services/adminApi";

const StudentCard = () => {
  const navigate = useNavigate();
  const [deleteStudent] = useDeleteStudentMutation();
  const { studentId } = useParams();
  const { data: admin, isLoading: adminLoading } = useGetAdminQuery();
  const { data: groupList, isFetching } = useGetGroupsQuery();
  const { data: student, isLoading } = useGetStudentQuery(studentId);
  const [drawer, setDrawer] = React.useState({ drawer: false });
  const [paymentDrawer, setPaymentDrawer] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const togglePayment = (open) => (event) => {
    setPaymentDrawer(open);
  };

  if (isLoading || isFetching || adminLoading) return <Loader />;

  const onDeleteHandler = () => {
    deleteStudent(student?.student?._id);
    navigate("/students");
  };
  const getGroupId = (id) => {
    return groupList?.Groups.find((g) => g._id === id);
  };

  return (
    <div className="container">
      {admin?.status === "admin" ? (
        <>
          <StudentDrawer
            title={"Talabani o'zgartirish"}
            drawer={drawer}
            setDrawer={setDrawer}
            currentId={student?.student?._id}
            toggleDrawer={toggleDrawer}
          />
          <PaymentDrawer
            title={"To'lov qo'shish"}
            togglePayment={togglePayment}
            setPaymentDrawer={setPaymentDrawer}
            paymentDrawer={paymentDrawer}
            studentId={student?.student?._id}
            studentName={student?.student?.name}
          />
        </>
      ) : null}
      <div className="student-card">
        <h2 className="student-title">{student?.student?.name}</h2>
        <div className="student-box">
          <div className="student-left">
            <h3>{student?.student?.name}</h3>
            <h4>Balans</h4>
            <div className="balance-tags">
              <p>
                {student?.student?.balans
                  ? formatter.format(Number(student?.student?.balans))
                  : formatter.format(Number(0))}
              </p>
            </div>

            <h4>Aloqa ma'lumotlarini</h4>
            <p>
              Telefon: <span>{student?.student?.number}</span>
            </p>
            <p>
              Tug'ilgan kun: <span>{student?.student?.birthday}</span>
            </p>
            {admin?.status === "admin" ? (
              <div className="right-buttons">
                <button className="edit" onClick={toggleDrawer(true)}>
                  <i className="fal fa-pen" />
                </button>
                <button className="payment" onClick={togglePayment(true)}>
                  <i className="fal fa-sack-dollar" />
                </button>
                <button className="delete" onClick={() => onDeleteHandler()}>
                  <i className="fal fa-trash" />
                </button>
              </div>
            ) : null}
          </div>
          <div className="student-right">
            <h3>Guruhlar</h3>
            <div className="group-box">
              <header className="box-header">
                <div className="part-left">
                  <span>{getGroupId(student?.student?.groupId)?.name}</span>
                  <Link to="/courses">3D(interyer) Elyor</Link>
                </div>
                <div className="part-right">
                  <span>03.06.2022 — 03.10.2022</span>
                  <p>Boshqa • 20:00</p>
                </div>
              </header>
              <div className="box-body">
                <p>
                  Holat: <span>Faol (O'qishni to'laydi)</span>
                </p>
                <p>
                  Talaba qo'shilgan sana:
                  <span>{student?.student?.fromDate}</span>
                </p>
                <p>
                  Faollashtirilgan: <span>27.06.2022</span>
                </p>
                <p>
                  Bu talaba uchun narx: <span>800 000.00 s'om</span>
                </p>
              </div>
            </div>
            {admin?.status === "admin" ? (
              <>
                <h3>To'lovlar</h3>
                <div className="payment-box">
                  <table>
                    <thead>
                      <tr>
                        <th className="date">Sana</th>
                        <th className="quanty">Miqdor</th>
                        <th className="comment">Izoh</th>
                        <th className="employee">Xodim</th>
                      </tr>
                    </thead>
                    {student?.pay.length ? (
                      <tbody>
                        {student.pay.map((p, i) => (
                          <tr key={i}>
                            <td className="date">{p.date}</td>
                            {p.amount < 0 ? (
                              <td className="quanty minus">
                                {formatter.format(p.amount)}
                              </td>
                            ) : (
                              <td className="quanty plus">
                                {formatter.format(p.amount)}
                              </td>
                            )}

                            <td className="comment">
                              <p className="lesson">
                                <span>{p.PayMethod}</span> {p.studentName}
                              </p>
                              <p className="date">{p.comment}</p>
                            </td>
                            <td className="employee">
                              <p>{p.admin}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tfoot>
                        <tr>
                          <td>
                            <p className="empty-error">Not found</p>
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
