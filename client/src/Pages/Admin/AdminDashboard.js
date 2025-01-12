import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../Context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <span className="d-flex align-items-center fs-4">
                <h4 className="me-2">Admin Name:</h4> {auth?.user?.name}
              </span>
              <span className="d-flex align-items-center fs-4">
                <h4 className="me-2">Admin Email:</h4>
                {auth?.user?.email}
              </span>
              <span className="d-flex align-items-center fs-4">
                <h4 className="me-2">Admin Phone:</h4>
                {auth?.user?.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
