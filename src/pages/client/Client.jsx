import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Client = () => {
  const [items, setItems] = useState([]);
  const [notification, setNotification] = useState('');
  const [cart, setCart] = useState([]);
  const [showCookingMessage, setShowCookingMessage] = useState(false);

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

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
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
        setCart([]);
        setNotification('Order placed successfully!');
        setShowCookingMessage(true);
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + (item.itemprice * item.quantity), 0);

  const itemCardStyle = "bg-gray-700 rounded-lg shadow-md p-4 text-white";

  return (
    <div style={{
      margin: 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'auto',
      background: 'linear-gradient(to right, white 0%, #333 60%)',
      animation: 'gradient 15s linear infinite',
      backgroundSize: '200% 100%',
      backgroundPosition: '0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className={itemCardStyle}>
              <div className="h-40 overflow-hidden mb-4">
                <img src={item.itemimageurl} alt={item.itemname} className="w-full object-cover" />
              </div>
              <h2 className="text-xl font-bold">{item.itemname}</h2>
              <p className="text-gray-300">Rs{item.itemprice}</p>
              <p className="mt-2">{item.itemdescription}</p>
              <button onClick={() => addToCart(item)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="md:col-span-1 bg-gray-800 text-white p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            {cart.map((cartItem) => (
              <div key={cartItem._id} className="flex justify-between items-center mb-2">
                <p>{cartItem.itemname} x {cartItem.quantity}</p>
                <p>Rs.{cartItem.itemprice * cartItem.quantity}</p>
              </div>
            ))}
            <p className="font-bold">Total Price: Rs.{totalPrice}</p>
            <button onClick={placeOrder} className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md">Place Order</button>
            {notification && <p>{notification}</p>}
            {showCookingMessage && (
              <>
                <p>Your food is being cooked</p>
                <div style={{ maxWidth: '80%', margin: '0 auto' }}> {/* Container to control GIF size */}
                  <img src="https://media2.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif?cid=6c09b9524ymodqnn6h48cl1a9p719s5sv0tpk09dl9hn8zeg&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Cooking GIF" style={{ width: '100%' }} /> {/* Set width to 100% */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Waves for decoration */}
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
  );
};

export default Client;
