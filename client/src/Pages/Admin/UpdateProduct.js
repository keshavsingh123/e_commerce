import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../Context/Auth";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [auth] = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");

  const getSingle = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get_product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setId(data.product._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (err) {
      console.log(err);
      toast.error("error in get One Product");
    }
  };
  useEffect(() => {
    getSingle();
  }, []);
  const allCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong to get categories");
    }
  };
  useEffect(() => {
    allCategory();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("category", category);
      photo && formData.append("photo", photo);
      const { data } = await axios.put(
        `/api/v1/product/update_product/${id}`,
        formData,
        {
          headers: {
            Authorization: auth.token,
            "Content-Type": "multipart/form-data", // Fetch token from local storage
          },
        }
      );
      if (data?.success) {
        toast.success("product updated");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure want to delete");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete_product/${id}`
      );
      toast.success("product deleted");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title={"Admin Dashboard Product"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Update Product</h2>
            <div className="m-1 w-75">
              {/* Ant Deisgn Select & Option */}
              <form className="form" onSubmit={handleUpdate}>
                <Select
                  className="mb-3 form-select"
                  bordered={false}
                  size="large"
                  showSearch
                  placeholder="select categories first"
                  value={name}
                  onChange={(value) => setCategory(value)} // value is from antd inbuilt props
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      value=""
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                {/* Preview */}
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        className="img img-responsive"
                        height={"200px"}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/get_product_photo/${id}`}
                        alt="product_photo"
                        className="img img-responsive"
                        height={"200px"}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name=""
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name=""
                    placeholder=" Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    placeholder="Write Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    size="large"
                    placeholder="Select Shipping"
                    showSearch
                    className="form-control mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className=" btn btn-primary btn-block me-2"
                  >
                    UPDATE PRODUCT
                  </button>
                  <button
                    type="submit"
                    onClick={handleDelete}
                    className=" btn btn-danger btn-block"
                  >
                    DELETE PRODUCT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
