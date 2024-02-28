import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { sendDelete, sendGet } from "../api";
import { useNavigate } from 'react-router-dom';

const AllUser = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await sendGet('findAllEmployees');
                setDataSource(data);
            } catch (error) {
                // Exeption
            }
        };
        fetchData();
    }, []);


    const handleAddClick = () => {
        navigate(`/addEmployee`);
    };

    // Trong component AllUser
    const handleEditClick = (user: any) => {
        navigate(`/addEmployee/${user.id}`, { state: { user:user, isEdit: true } });
    };

    const deleteUser = async (id: BigInt) => {
        // Xóa người dùng và cập nhật dataSource (không cần chuyển hướng)
        await sendDelete(`deleteEmployees/${id}`)
        const newDataSource = dataSource.filter((item) => item.id !== id);
        setDataSource(newDataSource);
    };

    const columns = [
        // Các cột của bảng
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "UserName",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Password",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Remember Me",
            dataIndex: "remember",
            key: "rememberMe",
            render: (remember: boolean) => (
                <span>{remember ? "On" : "Off"}</span>
            ),
        },
        {
            title: "Switch Mode",
            dataIndex: "switchMode",
            key: "switchMode",
            render: (switchMode: boolean) => (
                <span>{switchMode ? "On" : "Off"}</span>
            ),
        },
        {
            title: "Radio",
            dataIndex: "radioSelection",
            key: "Radio Selection",
        },
        {
            title: "Dropdown",
            dataIndex: "dropdownOption",
            key: "dropdownOption",
        },
        {
            title: "Action",
            key: "action",
            render: (record: any) => (
                <span>
                    <Button onClick={() => handleEditClick(record)}>Edit</Button>
                    <Button onClick={() => deleteUser(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
            <Button className="btn-add" onClick={handleAddClick}>
                Add
            </Button>
        </div>
    );
};

export default AllUser;
