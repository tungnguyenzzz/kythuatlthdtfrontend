// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Statistics = () => {
//   const [statistics, setStatistics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [total, setTotal] = useState(null);
//   useEffect(() => {
//     const fetchStatistics = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/statistics');
        
//         setStatistics(response.data);
        
//         let abc = (response.data.ordersByStatus
//           .filter((order) => order.status === "completed") // Lọc các phần tử có status = "completed"
//           .reduce((total, order) => total + Number(order.count), 0))
          
//           setTotal(abc);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStatistics();
//   }, []);

//   if (loading) return <div>Loading statistics...</div>;
//   if (error) return <div>Error: {error}</div>;
// console.log(statistics)
//   return (
//     <div>
//       <h1>Thống kê </h1>
//       <div>
//         <h3>Tổng đơn hàng</h3>
//         <p>{statistics.totalOrders}</p>
//       </div>
//       <div>
//         <h3>Doanh thu nhận</h3>
//         <p>${total*35000}</p>
//       </div>
//       <div>
//         <h3>Trạng thái </h3>
//         <ul>
//           {statistics.ordersByStatus.map((status) => (
//             <li key={status.status}>
//               {status.status}: {status.count}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Statistics;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statistics.css'; // Thêm file CSS để dễ quản lý

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/statistics');
        setStatistics(response.data);

        const completedTotal = response.data.ordersByStatus
          .filter((order) => order.status === "completed")
          .reduce((total, order) => total + Number(order.count), 0);

        setTotal(completedTotal);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) return <div className="loading">Loading statistics...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="statistics-container">
      <h1 className="title">📊 Thống kê đơn hàng</h1>
      <div className="statistics-grid">
        <div className="card">
          <h3>Tổng đơn hàng</h3>
          <p className="stat-value">{statistics.totalOrders}</p>
        </div>
        <div className="card">
          <h3>Doanh thu nhận</h3>
          <p className="stat-value">${(total * 35000).toLocaleString()}</p>
        </div>
        <div className="card status-list">
          <h3>Trạng thái đơn hàng</h3>
          <ul>
            {statistics.ordersByStatus.map((status) => (
              <li key={status.status}>
                <span className="status-label">{status.status}:</span>
                <span className="status-value">{status.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
