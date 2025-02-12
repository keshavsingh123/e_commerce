import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get_products");
      if (data?.success) {
        setProducts(data?.allProducts);
        if (data?.allProducts.length > 0) {
          toast.success("Products fetched successfully");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Products List</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <Link
                className="product-link"
                to={`/dashboard/admin/product/${p.slug}`}
                key={p._id}
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get_product_photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name} </h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
