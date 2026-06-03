import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiTalk } from "react-icons/gi";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import MyProfile from "../Pages/Profile/MyProfile";
import MyOrders from "../Pages/Profile/MyOrders";
import MyReviews from "../Pages/Profile/MyReviews";
import useAuth from "../Hook/UseAuth";
import useAxios from "../Hook/useAxios";
import Loader from "../components/Loader";

const Profilelayout = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { SignOut, user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

useEffect(() => {
  if (!user?.email) return;

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        `/userInfo/by-email/${user.email}`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [axiosInstance, user.email]);

  const handleLogout = () => {
    SignOut();
    navigate("/");
    toast.success("Logout Successfully");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <CgProfile /> },
    {
      id: "orders",
      label: "My Orders",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    { id: "reviews", label: "My Reviews", icon: <GiTalk /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <MyProfile data={data} />;
      case "orders":
        return <MyOrders data={data}/>;
      case "reviews":
        return <MyReviews />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-dark-gray-custom to-black-custom">
      {/* Beautiful Navbar */}
      <nav className="bg-black-custom shadow-lg border-b border-dark-gold sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Menu button for mobile */}
            <div className="flex items-center">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="lg:hidden p-2 rounded-lg bg-linear-to-r from-gold to-dark-gold text-black-custom hover:from-dark-gold hover:to-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {isDrawerOpen ? (
                  <AiOutlineClose size={20} />
                ) : (
                  <AiOutlineMenu size={20} />
                )}
              </button>
            </div>

            {/* Center - Profile Title */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-xl lg:text-2xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                My Account
              </h1>
            </div>

            {/* Right side - Home button */}
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <AiOutlineHome size={18} />
                <span className="hidden sm:inline font-medium">Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Side Drawer - Enhanced */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-black-custom shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Drawer Header - Enhanced */}
            <div className="p-6 border-b border-dark-gold bg-linear-to-r from-dark-gray-custom to-black-custom">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-bold text-gold text-lg">
                    {user?.displayName || data?.name}
                  </h3>
                  <p className="text-sm text-light-silver">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu - Enhanced */}
            <nav className="flex-1 p-4">
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                        ${
                          activeSection === item.id
                            ? "bg-linear-to-r from-gold to-dark-gold text-black-custom shadow-lg"
                            : "text-light-silver hover:bg-linear-to-r hover:from-dark-gray-custom hover:to-black-custom hover:text-gold"
                        }
                      `}
                    >
                      <span
                        className={`text-xl ${activeSection === item.id ? "text-black-custom" : "text-gold"}`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer Footer - Enhanced */}
            <div className="p-4 border-t border-dark-gold bg-dark-gray-custom">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-accent-red to-accent-red text-white rounded-xl hover:from-dark-gold hover:to-dark-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile - Enhanced */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Main Content - Enhanced */}
        <div className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8 max-w-6xl mx-auto">
            {/* Content Area - Enhanced */}
            <div className="bg-black-custom rounded-2xl shadow-xl border border-dark-gold overflow-hidden">
              <div className="bg-linear-to-r from-gold to-dark-gold p-6 text-black-custom">
                <h2 className="text-2xl font-bold capitalize">
                  {menuItems.find((item) => item.id === activeSection)?.label ||
                    "Profile"}
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <Loader size="large" text="Loading your profile data..." />
                ) : (
                  renderContent()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilelayout;
