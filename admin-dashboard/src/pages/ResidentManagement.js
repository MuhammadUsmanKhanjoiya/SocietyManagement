import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ResidentManagement() {
  const [residents, setResidents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'residents'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const residentsList = [];
      querySnapshot.forEach((doc) => {
        residentsList.push({ id: doc.id, ...doc.data() });
      });
      setResidents(residentsList);
    });

    return () => unsubscribe();
  }, []);

  const showModal = (record = null) => {
    setIsModalVisible(true);
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingId) {
          await updateDoc(doc(db, 'residents', editingId), values);
          message.success('Resident updated successfully');
        } else {
          await addDoc(collection(db, 'residents'), values);
          message.success('Resident added successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        message.error('Error: ' + error.message);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'residents', id));
      message.success('Resident deleted successfully');
    } catch (error) {
      message.error('Error: ' + error.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Flat Number',
      dataIndex: 'flatNumber',
      key: 'flatNumber',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Resident Management</h1>
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        Add New Resident
      </Button>
      <Table dataSource={residents} columns={columns} rowKey="id" />
      <Modal
        title={editingId ? "Edit Resident" : "Add New Resident"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="flatNumber"
            label="Flat Number"
            rules={[{ required: true, message: 'Please input the flat number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: 'Please input the contact number!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ResidentManagement;

