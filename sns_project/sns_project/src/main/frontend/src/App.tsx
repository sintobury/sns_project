import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import { RootState } from "./redux/reducers/rootReducer";

function App() {
  const isLogin = useSelector((state: RootState) => state.loginSlice.isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/main" element={isLogin ? <Main /> : <Login />}></Route>
        <Route path="/profile" element={isLogin ? <Profile /> : <Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
