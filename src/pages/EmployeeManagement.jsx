import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/api/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('Failed to fetch employees', err);
        setError('Could not retrieve employee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Employee Management</h3>
      {/* TODO: Add a button to create a new employee */}
      <table className="table-modern">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.position || 'N/A'}</td>
                <td>{emp.departmentName}</td>
                <td>{emp.roleName}</td>
                <td>
                  <button style={actionButton('edit')}>Edit</button>
                  <button style={actionButton('delete')}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Helper function for button styles
const actionButton = (type) => ({
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '5px',
  color: 'white',
  fontSize: '0.8rem',
  backgroundColor: type === 'edit' ? '#3498db' : '#e74c3c',
});

export default EmployeeManagement;
