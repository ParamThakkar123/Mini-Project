import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Client = () => {
  const [items, setItems] = useState([]);
  const [notification, setNotification] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getItems");
        const data = await response.json();
        setItems(data);
      } catch(error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:8000", {transports: ["websocket"]});

    socket.on("connection", () => {
      console.log("Connected to socket io");
    });

    socket.on('orderReady', (userId) => {
      setNotification('Your order is ready!');
    });

    return () => {
      socket.off('orderReady');
    };
  }, []);

  // Function to add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
      console.log(cart)
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      console.log(cart)
    }
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        orders: cart.map(cartItem => ({
          itemId: cartItem._id,
          quantity: cartItem.quantity,
        })),
      };
  
      const response = await fetch("http://localhost:5000/placeOrder", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        setCart([]); // Clear the cart after successful order placement
        setNotification('Order placed successfully!');
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  // Calculate total price of items in cart
  const totalPrice = cart.reduce((total, item) => total + (item.itemprice * item.quantity), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
          <img src={item.itemimageurl} alt={item.itemname} className="w-full h-48 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-bold">{item.itemname}</h2>
          <p className="text-gray-600">${item.itemprice}</p>
          <p className="mt-2">{item.itemdescription}</p>
          <button onClick={() => addToCart(item)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Add to Cart</button>
        </div>
      ))}

      {notification && <p>{notification}</p>}

      {/* Display Cart Contents */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.map((cartItem) => (
            <div key={cartItem._id} className="flex justify-between items-center mb-2">
            <p>{cartItem.itemname} x {cartItem.quantity}</p>
            <p>${cartItem.itemprice * cartItem.quantity}</p>
          </div>
        ))}
        <p className="font-bold">Total Price: ${totalPrice}</p>
      <button onClick={placeOrder} className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md">Place Order</button>
    </div>
    </div>
  );
};

export default Client;
