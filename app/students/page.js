"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
} from "antd";
import axios from "axios";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/students");
      setStudents(res.data);
    } catch (error) {
      message.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Open modal for Add or Edit
  const openModal = (student = null) => {
    setEditingStudent(student);
    if (student) {
      form.setFieldsValue(student);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingStudent) {
        // Update student
        await axios.put(`/api/students/${editingStudent.id}`, values);
        message.success("Student updated successfully");
      } else {
        // Add new student
        await axios.post("/api/students", values);
        message.success("Student added successfully");
      }

      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      message.error("Failed to save student");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      message.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      message.error("Failed to delete student");
    }
  };

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Major", dataIndex: "major" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete student"
            description="Are you sure to delete this student?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>Student Management</h1>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => openModal(null)}
      >
        Add Student
      </Button>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={students}
      />

      <Modal
        title={editingStudent ? "Edit Student" : "Add Student"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText={editingStudent ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="major"
            label="Major"
            rules={[{ required: true, message: "Please input major" }]}
          >
            <Input placeholder="Enter major" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
