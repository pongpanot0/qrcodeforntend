import "./App.css";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Setting from "./components/Setting";
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
import Schedue from "./components/calendar/Calendar";
import Devicegroup from "./components/Device/Devicegroup";
import DevicegroupEdit from "./components/Device/DevicegroupEdit";
import Roomcreate from "./components/HouseHold/Roomcreate";
import PersonalEdit from "./components/Personal/PersonalEdit";
import Persontab from "./components/Personal/Persontab";
import DeviceEdit from "./components/Device/DeviceEdit";
import Timeprofile from "./components/Personal/Timeprofile";
import Departmenttable from "./components/Department/Departmenttable";
import Department from "./components/Department/Department";
import DepartmentDetail from "./components/Department/DepartmentDetail";
import Timeprofiletable from "./components/Personal/Timeprofiletable";
import Timeprofileedit from "./components/Personal/Timeprofileedit";

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
        <Route path="/personal" element={<Persontab />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/log" element={<Log />} />
        <Route path="/schedue" element={<Schedue />} />
        <Route path="/Devicegroup" element={<Devicegroup />} />
        <Route path="/DevicegroupEdit/:id" element={<DevicegroupEdit />} />
        <Route path="/Roomcreate" element={<Roomcreate/>} />
        <Route path="/PersonalEdit/:id" element={<PersonalEdit/>} />
        <Route path="/DeviceEdit/:id" element={<DeviceEdit/>} />
        <Route path="/timeprofile" element={<Timeprofile/>} />
        <Route path="/department" element={<Department/>} />
        <Route path="/DepartmentDetail/:id" element={<DepartmentDetail/>} />
        <Route path="/Timeprofiletable" element={<Timeprofiletable/>} />
        <Route path="/timeprofileedit/:id" element={<Timeprofileedit/>} />
      </Routes>
    </>
  );
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainContainer />} />
        <Route exact path="/users/*" element={<LoginContainer />} />
        <Route path="/dashboard/*" element={<DefaultContainer />} />
        <Route path="/publiclink/*" element={<PublicLink />} />
      </Routes>
    </>
  );
}

export default App;
