import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [bill, setBill] = useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        if (response.data.order.status === 'completed') {
          setError('Cannot edit a completed order');
        } else {
          setOrder(response.data.order);
          setBill(response)
        }
      } catch (err) {
        console.error(err);
        setError('Order not found');
      }
    };
    fetchOrder();
  }, [id]);

  const handleItemChange = ( field, value) => {
    const updatedItems = [...items];
    updatedItems[field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, {
        notes,
        items,
      });
      alert('Order updated successfully!');
      navigate('/', { state: { message: 'Order updated successfully!' } }); // Điều hướng và gửi trạng thái
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };
  if (error) {
    alert(error);
    navigate('/'); // Quay lại danh sách đơn hàng
    return null;
  }
  if (!order) return <div>Loading...</div>;
console.log('bill',bill)
  return (
    <div>
      
      <h1>Edit Order #{id}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <h2>Items</h2>
        
          <div>
            <label>
              Product ID: {bill.data.items[0].product_id}
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={order.quantity}
                onChange={(e) => handleItemChange( 'quantity', Number(e.target.value))}
              />
            </label>
            <label>
              Options:
              <input
                type="text"
                value={JSON.stringify(order.options)}
                onChange={(e) => handleItemChange( 'options', JSON.parse(e.target.value))}
              />
            </label>
          </div>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditOrder;
