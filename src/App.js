import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

import Setting from "./components/Setting";
import DeviceDisplay from "./components/DeviceDisplay";
import Personal from "./components/Personal/Personal";
import GlobalStyle from "./components/globarStyles";
import Mainpage from "./components/Mainpage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import Qrcode from "./components/Qrcode/Qrcode";
import QrcodeShow from "./components/Qrcode/QrcodeShow";
import Devicetab from "./components/Device/Devicetab";
import Log from "./components/log/Log";

function App() {
  const MainContainer = () => (
    <>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </>
  );
  const PublicLink = () => (
    <>
      <Routes className="">
        <Route path="/qrcodeshow/:id" element={<QrcodeShow />} />
      </Routes>
    </>
  );
  const LoginContainer = () => (
    <>
      <Routes className="container">
        <Route exact path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
  const DefaultContainer = () => (
    <>
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/DeviceDisplay" element={<Devicetab />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </>
  );
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainContainer />} />
        <Route exact path="/users/*" element={<LoginContainer />} />
        <Route path="/dashboard/*" element={<DefaultContainer />} />
        <Route path="/publiclink/*" element={<PublicLink/>}/>
      </Routes>
    </>
  );
}

export default App;
