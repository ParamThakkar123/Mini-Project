import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

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
    <div>
      <h2>Pending Orders</h2>
      <ul>
        {pendingOrders.map((order, index) => (
          <li key={index}>
            <p>Item: {order.itemname}</p>
            <p>Quantity: {order.quantity}</p>
            <button onClick={() => handleDelete(order._id)}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;