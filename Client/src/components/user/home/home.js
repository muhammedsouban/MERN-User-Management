import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../components/user/home/home.css'
import axios from "axios";
import { useSelector } from 'react-redux'


function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const APIURL = useSelector(state => state.APIURL.url)

  const Logout = (() => {
    localStorage.clear();
  })

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    axios.get(`${APIURL}/profile/`, { headers }).then(response => {
      setData(response.data)
    })
  }, [APIURL])

  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">
          <Link to="/Profile">Profile</Link>
        </div>
        <nav className="navbar-nav">
          {data.email ?
            <div onClick={Logout} className="nav-item">
              <a href="/">Logout</a>
            </div>

            :
            <>
              <div className="nav-item">
                <Link to="/login">Login</Link>
              </div>
              <div className="nav-item">
                <Link to="/signup">Signup</Link>
              </div>
            </>

          }
        </nav>
      </div>
      <div className="profile">
        {data.email &&
          <div className="profile-snippet">
            <div className="profile-snippet-image-container">
              <img
                src={`${APIURL}/public/images/${data.image}`}
                alt={data.image}
                className="profile-snippet-image"
              />

            </div>
            <div className="profile-snippet-info">
              <div className="profile-snippet-username">{data.username}</div>
              <div className="profile-snippet-email"><span> Email :</span><b>{data.email}</b></div>
              <div className="profile-snippet-phone"><span> Mobile :</span><b>{data.mobile}</b></div>
              <button onClick={(() => { navigate('/profileUpdate') })} className="button"> Edit</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
