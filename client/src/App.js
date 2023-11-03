import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";

import CourseDetails from "./components/courseDetails.js";
import Dashboard from "./components/dashboard";
import GetDetails from "./components/getDetails";
import Home from "./components/home.js";
import Login from "./components/login.js";
import Private from "./components/private";
import Registration from "./components/register.js";

//defining the routes of the app
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Private />}>
          <Route path="courses" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="courseDetails/:id" element={<GetDetails />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
