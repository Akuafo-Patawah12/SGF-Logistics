import React, { useEffect, useState } from "react";
import { Table, Tag, Spin, message } from "antd";
import axios from "axios";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/api/orders");
                setOrders(response.data);
            } catch (error) {
                message.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const columns = [
        {
            title: "Order ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Service Type",
            dataIndex: "serviceType",
            key: "serviceType",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Delivered" ? "green" : "blue"}>{status}</Tag>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleString(),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>All Logistics Orders</h2>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table dataSource={orders} columns={columns} rowKey="_id" />
            )}
        </div>
    );
};

export default AdminOrder;
