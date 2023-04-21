import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../components/user/signup/signup.css';
import { UserSignupAction } from '../../../redux/action/userSignupAction';

const Signup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const signup = useSelector((state) => state.UserSignup);
  const APIURL = useSelector((state) => state.APIURL.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    dispatch(UserSignupAction(e.target.name, e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('username', signup.username);
      formData.append('email', signup.email);
      formData.append('mobile', signup.mobile);
      formData.append('password', signup.password);
      const response = await axios.post(`${APIURL}/register/`, formData);
      if (response.data.email) {
        navigate('/Login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="sign">
      <div className="center">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile flex justify-center py-4">
            <img src={previewImage} className="profile_img" alt="Profile" />
          </div>

          <div className="txt_field">
            <input
              type="text"
              title="Please enter a valid username"
              name="username"
              value={signup.username}
              onChange={onChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input
              type="email"
              title="Please enter a valid email"
              name="email"
              value={signup.email}
              onChange={onChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={signup.mobile}
              onChange={onChange}
              required
            />
            <label>Mobile</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              id="password"
              name="password"
              value={signup.password}
              onChange={onChange}
              required
            />
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input type="file" id="image" name="image" onChange={handleImageChange} required />
          </div>
          <input type="submit" value="Signup" />

          <div className="signup_link">
            Not a member? <Link to="/Login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
