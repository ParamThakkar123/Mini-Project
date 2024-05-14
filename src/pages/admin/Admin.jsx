import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <div>
        <button className="border p-3 w-36 mt-5 ml-5 rounded">
          <Link to="/addItem">Add Item</Link>
        </button>
      </div>
    </div>
  );
};

export default Admin;
