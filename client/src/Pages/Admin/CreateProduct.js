import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title={"Admin Dashboard Product"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>create product</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
