import Layout from "./hoc/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  Leads,
  Analytics,
  Finance,
  Groups,
  Settings,
  Students,
  Teachers,
  Dashboard,
  Courses,
  Profile,
  StudentDetail,
  GroupsDetail,
  Auth,
  NotFound,
} from "./pages";
import { CourseDetail, TeacherDetail } from "./containers";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Navigate to="/dashboard" replace />
            </div>
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Dashboard />
            </div>
          </Layout>
        }
      />
      <Route
        path="/leads"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Leads />
            </div>
          </Layout>
        }
      />
      <Route
        path="/analytics"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Analytics />
            </div>
          </Layout>
        }
      />
      <Route
        path="/finance"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Finance />
            </div>
          </Layout>
        }
      />
      <Route
        path="/groups"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Groups />
            </div>
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Settings />
            </div>
          </Layout>
        }
      />
      <Route
        path="/students"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Students />
            </div>
          </Layout>
        }
      />
      <Route
        path="/teachers"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Teachers />
            </div>
          </Layout>
        }
      />
      <Route
        path="/courses"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Courses />
            </div>
          </Layout>
        }
      />
      <Route
        path="/courses/:courseId"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <CourseDetail />
            </div>
          </Layout>
        }
      />
      <Route
        path="/user/profile"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <Profile />
            </div>
          </Layout>
        }
      />
      <Route
        path="/students/profile/:studentId"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <StudentDetail />
            </div>
          </Layout>
        }
      />
      <Route
        path="/teachers/profile/:teacherId"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <TeacherDetail />
            </div>
          </Layout>
        }
      />
      <Route
        path="/groups/view/:groupId"
        element={
          <Layout>
            <div className="app" style={{ height: "100%" }}>
              <GroupsDetail />
            </div>
          </Layout>
        }
      />
      <Route path="/auth/login" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
