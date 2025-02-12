import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <input
            type="text"
            className="form-control mb-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary ms-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
