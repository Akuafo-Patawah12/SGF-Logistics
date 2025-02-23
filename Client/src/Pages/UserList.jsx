import { useEffect, useState , useMemo} from "react";

import {Table, Tag, Button, Spin, message,Card,Typography,Input, Checkbox, Modal, Result, Select} from "antd";
import io from "socket.io-client";
import axios from "axios"

// Connect to Socket.IO server
const { Title } = Typography;


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState({}); // Store loading state for each user
  const [addUserPop,setAddUsersPop] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [ripple, setRipple] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const[ripple1,setRipple1] = useState(false)

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

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add-admin', newAdmin, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Admin added successfully');
      setNewAdmin({ username: '', password: '' });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleClick = (e,index) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    if(index===0){
    setRipple(true);
    setTimeout(() => setRipple(false), 600); // Remove ripple effect after 600ms
    }else {
      setRipple1(true);
    setTimeout(() => setRipple1(false), 600);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
    <button className="direction-button" onMouseEnter={(e)=> handleClick(e,0)} onClick={(e)=>{ 
      handleClick(e,0);
      setAddUsersPop(true)
      }}>
      Add users
      {ripple && <span className="ripple" style={{ top: coords.y, left: coords.x }} />}
    </button>
      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" onClick={filterAdmins} style={{ marginRight: "8px" }}>
          Show Admins
        </Button>
        <Button type="default" onClick={filterUsers} style={{ marginRight: "8px" }}>
          Show Users
        </Button>
        <Button onClick={resetFilter}>Show All</Button>
      </div>
      <div style={{width:"95%",overflow:"auto",marginInline:"auto"}} className="table_scroll"><Table columns={columns} dataSource={filteredUsers} rowKey="_id" /></div>

      {addUserPop && <section className="add-admin">
       <Card className="admin_sub" style={{ maxWidth: "400px", margin: "auto" }}>
      <Title level={3}>Add Admin</Title>
      <Input
        placeholder="Username"
        value={newAdmin.username}
        onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        style={{ marginBottom: "10px",height: 30 }}
      />
      <Input.Password
        placeholder="Password"
        value={newAdmin.password}
        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" block onClick={handleAddAdmin}>
        Add Admin
      </Button>
    </Card>
      </section>}
    </div>
  );
};

export default UserList;
