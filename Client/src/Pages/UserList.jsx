import { useEffect, useState , useMemo} from "react";
import { Table, Button, message, Spin } from "antd";
import io from "socket.io-client";

// Connect to Socket.IO server


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState({}); // Store loading state for each user


  const socket = useMemo(() =>io("http://localhost:4040/admin",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  useEffect(() => {
    // Fetch initial users
    socket.emit("getUsers");

    // Listen for the updated user list
    socket.on("userList", (data) => {
      setUsers(data);
      setFilteredUsers(data); // Show all users initially
    });

    // Listen for user deletion in real-time
    socket.on("userDeleted", (userId) => {
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));

      
    });

    return () => {
      socket.off("userList");
      socket.off("userDeleted");
    };
  }, []);

  // Handle user deletion
  const handleDelete =async (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true })); // Show loader
    try{
    socket.emit("deleteUser", userId ,(response)=>{
      if(response.status==="ok"){
      message.success(response.message);
    }
    })
    }catch(err){
      console.log(err)
    }finally{
      setLoading((prev) => ({ ...prev, [userId]: false })); // Remove loader
    }
  };

  // Filter functions
  const filterAdmins = () => {
    setFilteredUsers(users.filter((user) => user.account_type === "Admin"));
  };

  const filterUsers = () => {
    setFilteredUsers(users.filter((user) => user.account_type === "User"));
  };

  const resetFilter = () => {
    setFilteredUsers(users);
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "account_type",
      key: "account_type",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDelete(record._id)}
          disabled={loading[record._id]} // Disable button when loading
        >
          {loading[record._id] ? <Spin size="small" /> : "Delete"}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" onClick={filterAdmins} style={{ marginRight: "8px" }}>
          Show Admins
        </Button>
        <Button type="default" onClick={filterUsers} style={{ marginRight: "8px" }}>
          Show Users
        </Button>
        <Button onClick={resetFilter}>Show All</Button>
      </div>
      <Table columns={columns} dataSource={filteredUsers} rowKey="_id" />
    </div>
  );
};

export default UserList;
