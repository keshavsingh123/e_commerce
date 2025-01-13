import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../Context/Auth";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        {
          name,
        },
        {
          headers: {
            Authorization: auth.token, // Fetch token from local storage
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        allCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  const allCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong to get categories");
    }
  };
  useEffect(() => {
    allCategory();
  }, []);
  //handle update after edit update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        },
        {
          headers: {
            Authorization: auth.token, // Fetch token from local storage
          },
        }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        // toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        allCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/remove-cat/${pid}`,
        {
          headers: {
            Authorization: auth.token, // Fetch token from local storage
          },
        }
      );
      if (data?.success) {
        toast.success(`Category is deleted`);
        allCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Admin Dashboard Category"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Manage category</h2>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id} className="rounded">
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
