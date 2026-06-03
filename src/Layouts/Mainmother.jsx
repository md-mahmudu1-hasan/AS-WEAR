import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import SecondaryNavbar from "../components/SecondaryNavbar";
import Footer from "../components/Footer";

function Mainmother() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SecondaryNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Mainmother;
