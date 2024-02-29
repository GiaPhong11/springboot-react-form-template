import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { sendDelete, sendGet } from "../../api";
import { useNavigate } from 'react-router-dom';
import "./style.css";

const AllUser = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(5);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<BigInt | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await sendGet('findAllEmployees');
                setDataSource(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const handleAddClick = () => {
        navigate(`/add`);
    };

    // Trong component AllUser
    const handleEditClick = async (id: any) => {
        // const { password, ...userWithoutPassword } = user;
        const data = await sendGet(`employees/${id}`);
        navigate(`/edit/${id}`, { state: { user: data, isEdit: true } });
    };

    const deleteUser = (id: BigInt) => {
        // Hiển thị ModalConfirm và lưu id của người dùng cần xóa
        setDeleteUserId(id);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = async () => {
        if (deleteUserId) {
            await sendDelete(`deleteEmployees/${deleteUserId}`);
            const newDataSource = dataSource.filter((item) => item.id !== deleteUserId);
            setDataSource(newDataSource);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        // Các cột của bảng
        {
            title: "UserName",
            dataIndex: "userName",
            key: "userName",
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
                    <Button className="btn-edit" onClick={() => handleEditClick(record.id)}>Edit</Button>
                    <Button className="btn-delete" onClick={() => deleteUser(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
         
            <Button className="btn-add" onClick={handleAddClick}>
                Add
            </Button>
            <h1 className="titleUserList">LIST USER</h1>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination=
                {{
                    current: page,
                    pageSize: pagesize,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPagesize(pageSize);
                    }
                }}
            >
            </Table>
            <Modal
                title="Confirm Delete"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </div >
    );
};

export default AllUser;
