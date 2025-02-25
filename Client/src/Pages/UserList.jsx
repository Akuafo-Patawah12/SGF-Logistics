import { useEffect, useState , useMemo} from "react";

import {Table, Tag, Button, Spin, message,Card,Typography,Input, Checkbox, Modal, Result, Select} from "antd";
import io from "socket.io-client";
import axios from "axios"
import { useNavigate } from "react-router-dom"
// Connect to Socket.IO server



const UserList = () => {
  const { Title } = Typography;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState({}); // Store loading state for each user
  const [addUserPop,setAddUsersPop] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [ripple, setRipple] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const[ripple1,setRipple1] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permission, setPermission] = useState(false)
  const navigate = useNavigate()

  const socket = useMemo(() =>io("https://api.sfghanalogistics.com/admin",{
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

    socket.on("connect_error", (err)=>{
      console.log(err)
      if (err.message.includes("404: Refresh token not found")) {
        setTimeout(()=>{
        setIsModalOpen(true)
      },1000)
    
     }else if(err.message.includes("403: Unauthorized")) {
        setTimeout(()=>{
        setPermission(true)
      },1000)
        
     } else if (err.message.includes("401: Invalid refresh token")) {
        setTimeout(()=>{
          setIsModalOpen(true)
        },1000)
      }
    else if(err.message.includes("No cookies found")) {
      setTimeout(()=>{
      setIsModalOpen(true)
    },1000)
      
   }
    });

    return () => {
      socket.off("userList");
      socket.off("userDeleted");
      socket.off("connect_error")
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("lastVisitedTab", "/users");
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
    <>
    {!permission ?
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
  :

 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Result
            status="403"
            title="403"
            subTitle="You are not permitted to view this page."
            extra={
              <Button type="primary" onClick={() => {
                navigate("/")
                localStorage.removeItem("hasLoggedInBefore"); // Reset first login flag
                localStorage.removeItem("lastVisitedTab"); // Clear last visited tab
                }}>
                Go Home
              </Button>
            }
          />
        </div>}
    </>
  );
};

export default UserList;
