import Navbar from "../../../AdminModule/Components/Navbar/Navbar";
import Sidebar from "../../../AdminModule/Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
