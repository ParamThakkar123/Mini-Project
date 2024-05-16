import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/pendingOrders');
        const data = await response.json();
        setPendingOrders(data);
      } catch (error) {
        console.error('Failed to fetch pending orders', error);
      }
    };

    fetchPendingOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/pendingOrders/${orderId}`, {
        method: 'DELETE',
      });

      const socket = io('http://localhost:5000', {transports: ["websocket"]});
      socket.emit('orderDone', orderId);
      const response = await fetch('http://localhost:5000/pendingOrders');
      const data = await response.json();
      setPendingOrders(data);
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
      <button>
        <Link to='/addItem'>
          Add items to the list
        </Link>
      </button>
      <ul>
        {pendingOrders.map((order, index) => (
          <li key={index} className="border-b border-gray-200 py-2">
            <p className="text-lg">Item: {order.itemname}</p>
            <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
            <button onClick={() => handleDelete(order._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;