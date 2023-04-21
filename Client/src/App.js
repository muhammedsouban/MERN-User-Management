import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import AdminLogin from "./pages/admin/adminLogin";
import AdminHome from "./pages/admin/adminHome";
import ProfileEdit from "./pages/user/profileUpdate.js";
import UserUpdate from "./components/admin/userUpdate/userUpdate.js";
import AdminAddUser from "./pages/admin/addUser";

function App() {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/adminHome" element={<AdminHome />} />
          <Route exact path="/profileUpdate" element={<ProfileEdit />} />
          <Route exact path="/userUpdate" element={<UserUpdate />} />
          <Route exact path="/addUser" element={<AdminAddUser />} />



        </Routes>
      </BrowserRouter>
    
  );
}

export default App;


