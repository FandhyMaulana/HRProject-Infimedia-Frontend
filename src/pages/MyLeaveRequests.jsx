import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import useAuth from '../hooks/useAuth';

const MyLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return;
      try {
        const response = await axiosInstance.get(`/api/leaverequests/my-requests`);
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch leave requests', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  if (loading) return <p>Loading your requests...</p>;

  return (
    <div>
      <h3>My Leave Requests</h3>
      <table className="table-modern">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.leaveRequestId}>
                <td>{req.leaveTypeName}</td>
                <td>{new Date(req.startDate).toLocaleDateString()}</td>
                <td>{new Date(req.endDate).toLocaleDateString()}</td>
                <td>{req.reason}</td>
                <td>
                  <span className={`status-badge status-${req.status.toLowerCase()}`}>{req.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaveRequests;
