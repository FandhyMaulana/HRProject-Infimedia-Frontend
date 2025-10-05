import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import styles from './LeaveRequestsPage.module.css';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { FaPlus, FaSearch } from 'react-icons/fa';

const LeaveRequestsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canApprove = ['Superadmin', 'HR', 'Manager'].includes(user?.roleName);

  const [activeTab, setActiveTab] = useState(() => (canApprove ? 'for-approval' : 'my-requests'));

  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [modalState, setModalState] = useState({ type: null, data: null });
  const [approvalComment, setApprovalComment] = useState('');

  // FUNGSI INI HARUS ADA DI DALAM KOMPONEN
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = activeTab === 'my-requests' ? '/leaverequests/my-requests' : '/leaverequests/for-approval';
      const response = await axiosInstance.get(endpoint);
      setAllRequests(response.data || []);
    } catch (error) {
      setError('Failed to fetch leave requests.');
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    let filteredData = allRequests;
    if (activeTab === 'for-approval' && searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filteredData = allRequests.filter((item) => item.employeeName && item.employeeName.toLowerCase().includes(lowercasedFilter));
    }
    setFilteredRequests(filteredData);
    setCurrentPage(1);
  }, [searchTerm, allRequests, activeTab]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredRequests.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredRequests, pageSize]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // FUNGSI INI JUGA HARUS ADA DI DALAM KOMPONEN
  const handleStatusUpdate = async (id, status, comments) => {
    try {
      await axiosInstance.patch(`/leaverequests/${id}/status`, { Status: status, ApprovalComments: comments });
      // Di sini `fetchRequests` dipanggil untuk refresh data
      fetchRequests();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Failed to update status.'}`);
    }
  };

  const handleConfirmApproval = async () => {
    if (!modalState.data) return;
    const { leaveRequestId, newStatus } = modalState.data;
    await handleStatusUpdate(leaveRequestId, newStatus, approvalComment);
    closeModal();
  };

  const handleRowClick = (req) => setModalState({ type: 'detail', data: req });
  const handleOpenApprovalModal = (req, newStatus) => setModalState({ type: 'approval', data: { ...req, newStatus } });
  const closeModal = () => {
    setModalState({ type: null, data: null });
    setApprovalComment('');
  };

  const renderTable = () => {
    if (loading) return <Spinner />;
    if (error) return <p className={styles.error}>{error}</p>;
    if (currentTableData.length === 0) return <p className={styles.noData}>No requests found.</p>;

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {activeTab === 'for-approval' && <th>Employee</th>}
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              {activeTab === 'for-approval' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((req) => (
              <tr key={req.leaveRequestId} onClick={() => handleRowClick(req)} className={styles.clickableRow}>
                {activeTab === 'for-approval' && <td>{req.employeeName}</td>}
                <td>{req.leaveTypeName}</td>
                <td>{new Date(req.startDate).toLocaleDateString()}</td>
                <td>{new Date(req.endDate).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.status} ${styles[`status${req.status.toLowerCase()}`]}`}>{req.status}</span>
                </td>
                {activeTab === 'for-approval' && (
                  <td onClick={(e) => e.stopPropagation()} className={styles.actions}>
                    {req.status.toLowerCase() === 'pending' ? (
                      <>
                        <Button variant="success" onClick={() => handleOpenApprovalModal(req, 'Approved')}>
                          Approve
                        </Button>
                        <Button variant="danger" onClick={() => handleOpenApprovalModal(req, 'Rejected')}>
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Leave Requests</h1>
        <Button onClick={() => navigate('/leave-requests/new')}>
          <FaPlus /> Create Request
        </Button>
      </div>
      {user && (
        <div className={styles.balanceInfo}>
          Your Leave Balance: <strong>{user.leaveBalance} days</strong>
        </div>
      )}
      <div className={styles.tabs}>
        <button onClick={() => handleTabChange('my-requests')} className={`${styles.tab} ${activeTab === 'my-requests' ? styles.activeTab : ''}`}>
          My Leaves
        </button>
        {canApprove && (
          <button onClick={() => handleTabChange('for-approval')} className={`${styles.tab} ${activeTab === 'for-approval' ? styles.activeTab : ''}`}>
            Approval
          </button>
        )}
      </div>
      {activeTab === 'for-approval' && (
        <div className={styles.controls}>
          <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
            <Input placeholder="Search by employee name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </form>
        </div>
      )}
      {renderTable()}
      <Modal isOpen={modalState.type === 'detail'} onClose={closeModal} title="Leave Request Detail">
        {modalState.data && (
          <div className={styles.detailContainer}>
            <div className={styles.detailItem}>
              <strong>Employee:</strong> {modalState.data.employeeName}
            </div>
            <div className={styles.detailItem}>
              <strong>Type:</strong> {modalState.data.leaveTypeName}
            </div>
            <div className={styles.detailItem}>
              <strong>Date:</strong> {new Date(modalState.data.startDate).toLocaleDateString()} - {new Date(modalState.data.endDate).toLocaleDateString()}
            </div>
            <div className={styles.detailItem}>
              <strong>Status:</strong> {modalState.data.status}
            </div>
            <div className={styles.detailItem}>
              <strong>Reason:</strong> <p>{modalState.data.reason}</p>
            </div>
            {modalState.data.approverName && (
              <div className={styles.detailItem}>
                <strong>Approver:</strong> {modalState.data.approverName}
              </div>
            )}
            {modalState.data.approvalComments && (
              <div className={styles.detailItem}>
                <strong>Comments:</strong> <p>{modalState.data.approvalComments}</p>
              </div>
            )}
            {modalState.data.attachmentFileName && (
              <div className={styles.detailItem}>
                <strong>Attachment:</strong>{' '}
                <a href={modalState.data.attachmentFileName} target="_blank" rel="noopener noreferrer">
                  View Attachment
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
      <Modal isOpen={modalState.type === 'approval'} onClose={closeModal} title={`Confirm ${modalState.data?.newStatus}`}>
        {modalState.data && (
          <div>
            <p>
              You are about to <strong>{modalState.data.newStatus}</strong> this leave request. Please provide comments (optional).
            </p>
            <textarea className={styles.commentBox} rows="4" value={approvalComment} onChange={(e) => setApprovalComment(e.target.value)} placeholder="e.g., Approved, please arrange handover."></textarea>
            <div className={styles.formActions}>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant={modalState.data.newStatus === 'Approved' ? 'success' : 'danger'} onClick={handleConfirmApproval}>
                Confirm {modalState.data.newStatus}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default LeaveRequestsPage;
