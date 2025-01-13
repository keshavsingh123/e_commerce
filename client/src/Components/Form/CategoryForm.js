import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ms-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
