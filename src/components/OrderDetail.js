import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Detail</h1>
      <p><strong>Order ID:</strong> {order.order.id}</p>
      <p><strong>Customer ID:</strong> {order.order.customer_id}</p>
      <p><strong>Status:</strong> {order.order.status}</p>
      <p><strong>Notes:</strong> {order.order.notes}</p>
      <h2>Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.product_id}>
            Product ID: {item.product_id} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
