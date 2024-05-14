import React from "react";
import { Route, Routes } from "react-router-dom";
import Client from "./pages/client/Client";
import Admin from "./pages/admin/Admin";
import AddItem from "./pages/AddItem/AddItem";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/client" Component={Client} />
        <Route path="/admin" Component={Admin} />
        <Route path="/addItem" Component={AddItem} />
      </Routes>
    </div>
  );
};

export default App;
