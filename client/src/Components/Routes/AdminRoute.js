import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: auth.token, // Pass the token explicitly
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        console.error(err);
        setOk(false);
      }
    };
    if (auth.token) authCheck();
    console.log(auth.token);
  }, []);
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
