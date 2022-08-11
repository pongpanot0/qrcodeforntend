import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

import Setting from "./components/Setting";
import DeviceDisplay from "./components/DeviceDisplay";
function App() {
  return (
    <>
      <Sidebar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/DeviceDisplay" element={<DeviceDisplay />} />
          <Route path="/Setting" element={<Setting />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
