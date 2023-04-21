import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../components/admin/Dashboard/dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserUpdateAction } from '../../../redux/action/userUpdateAction';

const UserManage = () => {
  const APIURL = useSelector((state) => state.APIURL.url);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const Logout = () => {
    localStorage.clear();
  }

  const deleteUser = async (userId) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {

      await axios.delete(`${APIURL}/admin/deleteUser/${userId}`, userId);
      window.location.reload()
      }
    } catch (error) {
      console.error(error);
    }
  }

  const addUser=()=>{
    navigate('/addUser')
  }

  const editUser = async (userId) => {
    dispatch(UserUpdateAction(userId))
    navigate(`/userUpdate?id=${userId}`)

  }

  useEffect(() => {
    // Fetch users data from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${APIURL}/admin/loadDashboard/`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();

  }, [APIURL]);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div >
      <div className="navbar">
        <div className="navbar-brand">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="navbar-nav">
          <div onClick={Logout} className="nav-item">
            <a href="/admin/">Logout</a>
          </div>
        </nav>
      </div>
      <div className='content'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin:'0px 0px 10px' }}>
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={addUser} style={{backgroundColor:'black',width:'120px'}} >Add User  +</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => editUser(user._id)}>Edit</button>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
