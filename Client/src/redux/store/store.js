import UserLoginReducer from "../reducer/userLoginReducer.js";
import UserSignupReducer from "../reducer/userSignupReducer.js";
import UserUpdateReducer from "../reducer/userUpdateReducer.js";
import AdminLoginReducer from "../reducer/AdminLoginReducer.js";
import ApiUrlReducer from "../reducer/urlReducer.js";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  UserSignup: UserSignupReducer,
  UserLogin: UserLoginReducer,
  AdminLogin: AdminLoginReducer,
  UserUpdate: UserUpdateReducer,
  APIURL: ApiUrlReducer,
});

const store = createStore(rootReducer);

export default store;
