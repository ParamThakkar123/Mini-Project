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

      const socket = io('http://localhost:5000', { transports: ["websocket"] });
      socket.emit('orderDone', orderId);
      const response = await fetch('http://localhost:5000/pendingOrders');
      const data = await response.json();
      setPendingOrders(data);
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Pending Orders</h2>
      <ul style={styles.list}>
        {pendingOrders.map((order, index) => (
          <li key={index} style={styles.listItem}>
            <p>Item: {order.itemname}</p>
            <p>Quantity: {order.quantity}</p>
            <button onClick={() => handleDelete(order._id)} style={styles.button}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    margin: 'auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    overflow: 'auto',
    background: 'linear-gradient(to right, #0c0c0c 0%, #242424 100%)',
    animation: 'gradient 15s linear infinite',
    backgroundSize: '200% 100%',
    backgroundPosition: '0 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '600px',
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    background: '#333',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  button: {
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Admin;