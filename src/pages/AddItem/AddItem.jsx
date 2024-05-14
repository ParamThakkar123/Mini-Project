import React, { useState } from "react";
import { imageDb } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice || !itemDescription) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const imageRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);

      const response = await fetch("http://localhost:5000/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemname: itemName,
          itemprice: itemPrice,
          itemdescription: itemDescription,
          itemimageurl: downloadURL
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item. Please try again later.");
      }

      const result = await response.json();
      console.log(result);

      setItemName("");
      setItemPrice("");
      setItemDescription("");
    } catch (error) {
      setError(error.message);
      console.error("Error adding item:", error);
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

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
        <div className="flex flex-col mt-2">
          <label htmlFor="itemDesc">Item Image: </label>
          <input
            type="file"
            placeholder="Item Description"
            name="itemimage"
            onChange={handleImageUpload}
            className="mt-3 border-solid border-2 border-black p-2 rounded"
          />
          {
            imageUrl && (
              <div className="mt-3">
                <img src={imageUrl} alt="Uploaded" className="max-w-xs" />
              </div>
            )
          }
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
