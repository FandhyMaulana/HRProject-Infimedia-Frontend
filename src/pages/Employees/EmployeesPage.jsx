import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import styles from './EmployeesPage.module.css';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import Pagination from '../../components/common/Pagination';
import { FaPlus, FaSearch } from 'react-icons/fa';

// // form untuk tambah/edit employee
// const EmployeeForm = ({ initialData = {}, onSubmit, onCancel, departments, roles }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     departmentId: '',
//     roleId: '',
//   });

//   useEffect(() => {
//     if (initialData.employeeId) {
//       setFormData({
//         firstName: initialData.fullName?.split(' ')[0] || '',
//         lastName: initialData.fullName?.split(' ').slice(1).join(' ') || '',
//         email: initialData.email || '',
//         password: '',
//         departmentId: departments.find((d) => d.departmentName === initialData.departmentName)?.departmentId || '',
//         roleId: roles.find((r) => r.roleName === initialData.roleName)?.roleId || '',
//       });
//     } else {
//       setFormData({ firstName: '', lastName: '', email: '', password: '', departmentId: '', roleId: '' });
//     }
//   }, [initialData.employeeId, departments, roles]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const isEditMode = !!initialData.employeeId;

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <div className={styles.formGrid}>
//         <div className={styles.formGroup}>
//           <label htmlFor="firstName">First Name</label>
//           <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="lastName">Last Name</label>
//           <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
//         </div>
//       </div>
//       <div className={styles.formGroup}>
//         <label htmlFor="email">Email</label>
//         <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isEditMode} />
//       </div>
//       {!isEditMode && (
//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />
//         </div>
//       )}
//       <div className={styles.formGrid}>
//         <div className={styles.formGroup}>
//           <label htmlFor="departmentId">Department</label>
//           <select id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} className={styles.select} required>
//             <option value="">Select Department</option>
//             {departments.map((d) => (
//               <option key={d.departmentId} value={d.departmentId}>
//                 {d.departmentName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="roleId">Role</label>
//           <select id="roleId" name="roleId" value={formData.roleId} onChange={handleChange} className={styles.select} required>
//             <option value="">Select Role</option>
//             {roles.map((r) => (
//               <option key={r.roleId} value={r.roleId}>
//                 {r.roleName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className={styles.formActions}>
//         <Button type="button" variant="secondary" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit">{isEditMode ? 'Save Changes' : 'Create Employee'}</Button>
//       </div>
//     </form>
//   );
// };
// Ganti komponen EmployeeForm yang lama dengan yang ini
const EmployeeForm = ({ initialData = {}, onSubmit, onCancel, departments, roles }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.fullName?.split(' ')[0] || '',
    lastName: initialData.fullName?.split(' ').slice(1).join(' ') || '',
    email: initialData.email || '',
    password: '',
    phone: initialData.phone || '',
    position: initialData.position || '',
    hireDate: initialData.hireDate ? new Date(initialData.hireDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    departmentId: departments.find((d) => d.departmentName === initialData.departmentName)?.departmentId || '',
    roleId: roles.find((r) => r.roleName === initialData.roleName)?.roleId || '',
  });

  // Kunci perbaikan ada di useEffect ini
  useEffect(() => {
    // Hanya update form jika initialData (data karyawan yang diedit) berubah
    if (initialData && initialData.employeeId) {
      setFormData({
        firstName: initialData.fullName?.split(' ')[0] || '',
        lastName: initialData.fullName?.split(' ').slice(1).join(' ') || '',
        email: initialData.email || '',
        password: '',
        phone: initialData.phone || '',
        position: initialData.position || '',
        hireDate: initialData.hireDate ? new Date(initialData.hireDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        departmentId: departments.find((d) => d.departmentName === initialData.departmentName)?.departmentId || '',
        roleId: roles.find((r) => r.roleName === initialData.roleName)?.roleId || '',
      });
    }
  }, [initialData.employeeId]); // <-- Dependensi diubah menjadi initialData.employeeId

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditMode = !!initialData.employeeId;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isEditMode} />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="position">Position</label>
          <Input id="position" name="position" value={formData.position} onChange={handleChange} />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="hireDate">Hire Date</label>
        <Input id="hireDate" name="hireDate" type="date" value={formData.hireDate} onChange={handleChange} required />
      </div>

      {!isEditMode && (
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />
        </div>
      )}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="departmentId">Department</label>
          <select id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} className={styles.select} required>
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>
                {d.departmentName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="roleId">Role</label>
          <select id="roleId" name="roleId" value={formData.roleId} onChange={handleChange} className={styles.select} required>
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r.roleId} value={r.roleId}>
                {r.roleName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.formActions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditMode ? 'Save Changes' : 'Create Employee'}</Button>
      </div>
    </form>
  );
};
// halaman utama
const EmployeesPage = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [empRes, deptRes, roleRes] = await Promise.all([axiosInstance.get('/employees'), axiosInstance.get('/masterdata/departments'), axiosInstance.get('/masterdata/roles')]);
      setAllEmployees(empRes.data || []);
      setDepartments(deptRes.data || []);
      setRoles(roleRes.data || []);
    } catch (err) {
      setError('Failed to fetch initial data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = allEmployees.filter((item) => item.fullName.toLowerCase().includes(lowercasedFilter));
    setFilteredEmployees(filteredData);
    setCurrentPage(1);
  }, [searchTerm, allEmployees]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredEmployees.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredEmployees, pageSize]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  const openModal = (type, data = null) => setModalState({ isOpen: true, type, data });
  const closeModal = () => setModalState({ isOpen: false, type: null, data: null });

  const handleFormSubmit = async (formData) => {
    try {
      if (modalState.type === 'add') {
        await axiosInstance.post('/auth/register', formData);
      } else if (modalState.type === 'edit') {
        const { email, password, ...updateData } = formData;
        await axiosInstance.put(`/employees/${modalState.data.employeeId}`, updateData);
      }
      closeModal();
      fetchData();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Operation failed'}`);
    }
  };

  const handleDelete = async () => {
    if (!modalState.data) return;
    try {
      await axiosInstance.delete(`/employees/${modalState.data.employeeId}`);
      closeModal();
      fetchData();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Failed to deactivate employee'}`);
    }
  };

  const getModalContent = () => {
    switch (modalState.type) {
      case 'add':
        return <EmployeeForm onSubmit={handleFormSubmit} onCancel={closeModal} departments={departments} roles={roles} />;
      case 'edit':
        const empData = {
          ...modalState.data,
          firstName: modalState.data.fullName.split(' ')[0] || '',
          lastName: modalState.data.fullName.split(' ').slice(1).join(' ') || '',
          departmentId: departments.find((d) => d.departmentName === modalState.data.departmentName)?.departmentId,
          roleId: roles.find((r) => r.roleName === modalState.data.roleName)?.roleId,
        };
        return <EmployeeForm initialData={empData} onSubmit={handleFormSubmit} onCancel={closeModal} departments={departments} roles={roles} />;
      case 'delete':
        return (
          <div>
            <p>
              Are you sure you want to deactivate <strong>{modalState.data?.fullName}</strong>? This action will mark the employee as inactive.
            </p>
            <div className={styles.formActions}>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Deactivate
              </Button>
            </div>
          </div>
        );
      case 'detail':
        if (!modalState.data) return null;
        return (
          <div className={styles.detailContainer}>
            <div className={styles.detailGroup}>
              <label>Full Name</label>
              <p>{modalState.data.fullName}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Email</label>
              <p>{modalState.data.email}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Phone</label>
              <p>{modalState.data.phone || '-'}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Position</label>
              <p>{modalState.data.position || '-'}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Hire Date</label>
              <p>{new Date(modalState.data.hireDate).toLocaleDateString()}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Manager</label>
              <p>{modalState.data.managerName || '-'}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Position</label>
              <p>{modalState.data.position || '-'}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Department</label>
              <p>{modalState.data.departmentName}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Role</label>
              <p>{modalState.data.roleName}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Leave Balance</label>
              <p>{modalState.data.leaveBalance}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalState.type) {
      case 'add':
        return 'Add New Employee';
      case 'edit':
        return 'Edit Employee';
      case 'delete':
        return 'Confirm Deactivation';
      case 'detail':
        return 'Employee Detail';
      default:
        return '';
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Employees</h1>
        <Button onClick={() => openModal('add')}>
          <FaPlus /> Add Employee
        </Button>
      </div>

      <div className={styles.controls}>
        <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
          <Input placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button type="submit" variant="secondary">
            <FaSearch />
          </Button>
        </form>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Leave Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map((emp) => (
                  <tr key={emp.employeeId}>
                    <td>{emp.fullName}</td>
                    <td>{emp.departmentName}</td>
                    <td>{emp.leaveBalance}</td>
                    <td className={styles.actions}>
                      <Button variant="secondary" onClick={() => openModal('edit', emp)}>
                        Edit
                      </Button>
                      <Button variant="info" onClick={() => openModal('detail', emp)}>
                        Detail
                      </Button>
                      <Button variant="danger" onClick={() => openModal('delete', emp)}>
                        Deactivate
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.noData}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>
      )}

      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={getModalTitle()}>
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default EmployeesPage;
