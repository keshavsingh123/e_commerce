import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/count_products");
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
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
    }
  };
  useEffect(() => {
    allCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product_list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product_list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleFilter = async (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (err) {
      console.log(err);
    }
  };
  //filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter_products", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data?.products); //products is from controller response
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProducts();
    if (checked.length > 0 || radio.length > 0) {
      filterProduct();
    }
  }, [checked, radio]);
  return (
    <Layout title={"All-Product Best Offer"}>
      <div className="row">
        <div className="col-md-2 mt-3">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column p-2">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-center mt-4">Filter By Price</h6>
          <div className="d-flex flex-column p-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/get_product_photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name} </h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">$ {p.price}</p>

                  <button className="btn btn-primary me-1">Details</button>
                  <button className="btn btn-secondary">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-3 p-3 text-center">
            {products && products.length < total && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading.." : "load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
