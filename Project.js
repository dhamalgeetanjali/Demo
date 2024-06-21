import React, { useEffect, useState } from 'react';
import './Program.css';  // Import the CSS file
import { Link } from 'react-router-dom';

const Program = () => {
  const [cities, setCities] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const getCities = async () => {
    try {
      const response = await fetch("http://institute.bizup.in/api/city/list");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleRowClick = (cityId) => {
    setSelectedRow(cityId);
  };



  return (
    <div className="table-container">
      <h2>City Name</h2>
      <Link  to="/formop"className='btn btn-primary text-black'>AddCity</Link>
      <table className="table">
        <thead>
          <tr>
            <th>City ID</th>
            <th>City Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((item) => (
            <tr
              key={item.city_id}
              className={selectedRow === item.city_id ? 'highlighted' : ''}
              onClick={() => handleRowClick(item.city_id)}
            >
              <td>{item.city_id}</td>
              <td>{item.city_name}</td>
              <td><Link to={`/show/city/${item.city_id}`} className='btn btn-success text-white m-2'>View</Link><Link className='btn btn-primary text-white m-2'>Edit</Link><Link className='btn btn-danger text-white m-2'>Delete</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Program;
