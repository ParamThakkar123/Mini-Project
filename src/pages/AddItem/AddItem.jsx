import React, { useState } from "react";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!itemName || !itemPrice || !itemDescription) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemname: itemName,
          itemprice: itemPrice,
          itemdescription: itemDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item. Please try again later.");
      }

      const result = await response.json();
      console.log(result);

      // Optionally, reset form fields after successful submission
      setItemName("");
      setItemPrice("");
      setItemDescription("");
    } catch (error) {
      setError(error.message);
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-xl mt-10 tracking-wide">Add Items to your Menu</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-wrap mt-20 border rounded p-14"
      >
        <div className="flex flex-col">
          <label htmlFor="itemName">Item Name: </label>
          <input
            type="text"
            placeholder="Item Name"
            name="itemname"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-3 border-solid border-2 border-black p-2 rounded"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="itemPrice">Item Price: </label>
          <input
            type="text"
            placeholder="Item Price"
            name="itemprice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            className="mt-3 border-solid border-2 border-black p-2 rounded"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="itemDesc">Item Description: </label>
          <input
            type="text"
            placeholder="Item Description"
            name="itemdescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="mt-3 border-solid border-2 border-black p-2 rounded"
          />
        </div>
        <div className="mt-3 w-full border text-center rounded">
          <button type="submit" className="p-2">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
