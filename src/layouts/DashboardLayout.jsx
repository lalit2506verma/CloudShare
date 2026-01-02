import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useState } from "react";

const DashboardLayout = ({ children, activeMenu}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = useState();


  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <>
      {/* NavBar */}
      <Navbar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} activeMenu={activeMenu} />

      {user && (
        <div className="flex bg-slate-50">
          <div className="max-[1080px]:hidden">
            {/* Side menu */}
            <SideMenu onClose={() => setOpenSideMenu(false)} activeMenu={activeMenu} />
          </div>

          {/* Mobile Sidebar -overlay with backdrop */}
          {openSideMenu && (
            <>
              {/* Backdrop - Click to close
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setOpenSideMenu(false)}
              /> */}

              {/* Sidebar Drawer */}
              <div className="fixed top-17.5 left-0 bottom-0 z-50 lg:hidden">
                <SideMenu onClose={() => setOpenSideMenu(false)} activeMenu={activeMenu} />
              </div>
            </>
          )}

          {/* Main Content */}
          <div className="flex-1 p-5 w-full">{children}</div>
        </div>
      )}
    </>
  );
}

export default DashboardLayout