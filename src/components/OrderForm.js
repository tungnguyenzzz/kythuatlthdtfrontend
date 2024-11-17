// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const OrderForm = () => {
//   const [customerId, setCustomerId] = useState('');
//   const [productId, setProductId] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [notes, setNotes] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newOrder = {
//       customer_id: customerId,
//       items: [{ product_id: productId, quantity, options: {} }],
//       notes,
//     };
//     try {
//       await axios.post('http://localhost:5000/api/orders', newOrder);
//       navigate('/', { state: { message: 'Order created successfully!' } }); // Điều hướng kèm thông báo
//     } catch (err) {
//       console.error('Error creating order:', err);
//       alert('Failed to create order');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Tạo đơn hàng</h1>
//       <label>Tên khách hàng</label>
//       <input
//         type="text"
//         value={customerId}
//         onChange={(e) => setCustomerId(e.target.value)}
//         required
//       />
//       <label>Tên đồ uống</label>
//       <input
//         type="text"
//         value={productId}
//         onChange={(e) => setProductId(e.target.value)}
//         required
//       />
//       <label>Số lượng:</label>
//       <input
//         type="number"
//         value={quantity}
//         onChange={(e) => setQuantity(Number(e.target.value))}
//         required
//       />
//       <label>Notes:</label>
//       <textarea
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//       />
//       <button type="submit">Create Order</button>
//     </form>
//   );
// };

// export default OrderForm;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderForm.css';

const OrderForm = () => {
  const [customer_id, setCustomerId] = useState(''); // Tên biến giữ nguyên là customer_id
  const [product_id, setProductId] = useState('');   // Tên biến giữ nguyên là product_id
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      customer_id, // Gửi customer_id
      items: [{ product_id, quantity, options: {} }], // Gửi product_id
      notes,
    };
    try {
      await axios.post('http://localhost:5000/api/orders', newOrder);
      navigate('/', { state: { message: 'Order created successfully!' } });
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order');
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Tạo đơn hàng</h1>
      <div className="form-group">
        <label>Tên khách hàng</label>
        <input
          type="text"
          value={customer_id}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Nhập tên khách hàng"
          required
        />
      </div>
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          value={product_id}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Nhập tên sản phẩm"
          required
        />
      </div>
      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <div className="form-group">
        <label>Ghi chú</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Nhập ghi chú (tuỳ chọn)"
        />
      </div>
      <button type="submit" className="submit-button">
        Tạo đơn hàng
      </button>
    </form>
  );
};

export default OrderForm;
