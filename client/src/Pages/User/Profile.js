import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";

const Profile = () => {
  return (
    <Layout title={"User Dashboard Profile"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2>Profile</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
