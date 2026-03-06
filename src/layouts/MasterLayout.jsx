import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

export default function MasterLayout() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex h-screen"> 
        <Sidebar />
        </div>

        {/* Main section */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Breadcrumb />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
