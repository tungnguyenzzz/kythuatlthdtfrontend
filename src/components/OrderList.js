import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './OrderList.css'; // Thêm file CSS riêng

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Lấy danh sách đơn hàng từ backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [location]);

  // Hủy đơn hàng
  const cancelOrder = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await axios.patch(`http://localhost:5000/api/orders/${id}/cancel`, {
          reason: 'Customer cancelled the order',
        });
        setOrders(
          orders.map((order) =>
            order.id === id ? { ...order, status: 'cancelled' } : order
          )
        );
        alert(`Order ${id} cancelled successfully`);
      } catch (err) {
        console.error('Error cancelling order:', err);
        alert('Failed to cancel order');
      }
    }
  };

  // Cập nhật trạng thái đơn hàng
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus });
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      alert(`Order ${id} status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-list-container">
      <h1>Danh sách đơn hàng</h1>

      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Tên đồ uống</th>
              <th>Tên khách hàng</th>
              <th>Trạng thái đơn hàng</th>
              <th>Hành động</th>
              <th>Ghi chú</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.items[0].product_id}</td>
                <td>{order.customer_id}</td>
                <td>
                  <span
                    className={`status-label ${
                      order.status === 'completed'
                        ? 'completed'
                        : order.status === 'cancelled'
                        ? 'cancelled'
                        : 'in-progress'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === 'new' && (
                    <button
                      className="action-button start"
                      onClick={() => updateStatus(order.id, 'in_progress')}
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'in_progress' && (
                    <button
                      className="action-button complete"
                      onClick={() => updateStatus(order.id, 'completed')}
                    >
                      Complete
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <span className="status-text completed">Completed</span>
                  )}
                </td>
                <td>{order.notes}</td>
                <td>
                  {order.status === 'cancelled' || order.status === 'completed' ? (
                    <span className="disabled-link">Cannot Edit</span>
                  ) : (
                    <Link to={`/orders/${order.id}/edit`} className="edit-link">
                      Edit
                    </Link>
                  )}
                  <button
                    className="cancel-button"
                    onClick={() => cancelOrder(order.id)}
                    disabled={order.status === 'cancelled' || order.status === 'completed'}
                  >
                    {order.status === 'cancelled' || order.status === 'completed'
                      ? 'Cancelled'
                      : 'Cancel'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
