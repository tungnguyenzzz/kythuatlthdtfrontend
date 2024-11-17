import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderDetail from './components/OrderDetail';
import EditOrder from './components/EditOrder';
import Statistics from './components/Statistics';
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Orders</Link> | <Link to="/create-order">Create Order</Link> | <Link to="/statistics">Thống kê</Link>
      </nav>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/create-order" element={<OrderForm />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/:id/edit" element={<EditOrder />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
};

export default App;

