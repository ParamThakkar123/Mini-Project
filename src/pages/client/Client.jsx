import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Client = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("http://localhost:5000/getItems");
        const data = await response.json();
        setItems(data);
      }
      catch(error){
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <Link to={`/item/${item._id}`} key={item._id}>
          <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
            <img src={item.itemimageurl} alt={item.itemname} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-bold">{item.itemname}</h2>
            <p className="text-gray-600">${item.itemprice}</p>
            <p className="mt-2">{item.itemdescription}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Client;
