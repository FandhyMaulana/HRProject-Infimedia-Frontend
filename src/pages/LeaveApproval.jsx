import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const LeaveApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi untuk mengambil data
  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      // Asumsi endpoint ini ada di backend untuk mengambil semua request yang 'Pending'
      const response = await axiosInstance.get('/api/Leaverequests/for-approval');
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to fetch pending requests', err);
      setError('Could not retrieve leave requests for approval.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axiosInstance.patch(`/api/leaverequests/${requestId}/status`, {
        status: newStatus,
        approvalComments: `${newStatus} by manager.`,
      });
      // Hapus request yang sudah diproses dari daftar untuk update UI
      setRequests((prev) => prev.filter((req) => req.leaveRequestId !== requestId));
    } catch (error) {
      console.error(`Failed to ${newStatus} request`, error);
      alert(`Error updating request status. Please try again.`);
    }
  };

  if (loading) return <p>Loading requests for approval...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Leave Approval Requests</h3>
      <table className="table-modern">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.leaveRequestId}>
                <td>{req.employeeName}</td>
                <td>{req.leaveTypeName}</td>
                <td>{new Date(req.startDate).toLocaleDateString()}</td>
                <td>{new Date(req.endDate).toLocaleDateString()}</td>
                <td>{req.reason}</td>
                <td>
                  <button style={actionButton('approve')} onClick={() => handleUpdateStatus(req.leaveRequestId, 'Approved')}>
                    Approve
                  </button>
                  <button style={actionButton('reject')} onClick={() => handleUpdateStatus(req.leaveRequestId, 'Rejected')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No pending requests for approval.
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
  backgroundColor: type === 'approve' ? '#2ecc71' : '#e74c3c',
});

export default LeaveApproval;
