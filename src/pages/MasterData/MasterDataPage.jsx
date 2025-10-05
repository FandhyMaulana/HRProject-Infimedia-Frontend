import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';
import styles from './MasterDataPage.module.css';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner';

const MasterDataCard = ({ title, items, onAddItem, loading }) => {
  const [newItemName, setNewItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem(newItemName);
      setNewItemName('');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className={styles.addForm}>
        <Input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder={`New ${title.slice(0, -1)}`} required />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

const MasterDataPage = () => {
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState({ roles: true, departments: true });

  const fetchRoles = useCallback(async () => {
    setLoading((p) => ({ ...p, roles: true }));
    const res = await axiosInstance.get('/masterdata/roles');
    setRoles(res.data.map((r) => ({ id: r.roleId, name: r.roleName })));
    setLoading((p) => ({ ...p, roles: false }));
  }, []);

  const fetchDepartments = useCallback(async () => {
    setLoading((p) => ({ ...p, departments: true }));
    const res = await axiosInstance.get('/masterdata/departments');
    setDepartments(res.data.map((d) => ({ id: d.departmentId, name: d.departmentName })));
    setLoading((p) => ({ ...p, departments: false }));
  }, []);

  useEffect(() => {
    fetchRoles();
    fetchDepartments();
  }, [fetchRoles, fetchDepartments]);

  const handleAddRole = async (roleName) => {
    await axiosInstance.post('/masterdata/roles', JSON.stringify(roleName), { headers: { 'Content-Type': 'application/json' } });
    fetchRoles();
  };

  const handleAddDepartment = async (departmentName) => {
    await axiosInstance.post('/masterdata/departments', JSON.stringify(departmentName), { headers: { 'Content-Type': 'application/json' } });
    fetchDepartments();
  };

  return (
    <div className={styles.page}>
      <h1>Master Data</h1>
      <div className={styles.grid}>
        <MasterDataCard title="Roles" items={roles} onAddItem={handleAddRole} loading={loading.roles} />
        <MasterDataCard title="Departments" items={departments} onAddItem={handleAddDepartment} loading={loading.departments} />
      </div>
    </div>
  );
};

export default MasterDataPage;
