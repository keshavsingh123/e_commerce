import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={"Admin Dashboard Category"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>create category</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
