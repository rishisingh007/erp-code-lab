import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Box,
  ShoppingCart,
  Settings,
  Briefcase,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(
    parseInt(localStorage.getItem("sidebarWidth")) || 240
  );
  const [isResizing, setIsResizing] = useState(false);
  const [openMenu, setOpenMenu] = useState({
    accounts: false,
    hr: false,
    inventory: false,
    sales: false,
    master: false,
  });

  // toggle menu open/close
  const toggleMenu = (key) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= 160 && newWidth <= 400) setWidth(newWidth);
    };
    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        localStorage.setItem("sidebarWidth", width);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, width]);

  const navClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 text-sm ${
      isActive ? "bg-gray-200 font-semibold" : ""
    }`;

  return (
    <aside
      style={{ width: collapsed ? "64px" : `${width}px` }}
      className={`relative bg-gray-50 border-r transition-all duration-200 select-none`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        {!collapsed && <span className="font-semibold">ERP System</span>}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded hover:bg-gray-200"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 overflow-y-auto text-gray-700">
        {/* Dashboard */}
        <NavLink to="/" className={navClasses} end>
          <FileText size={18} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {/* ACCOUNTS */}
        <div>
          <button
            onClick={() => toggleMenu("accounts")}
            className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <Briefcase size={18} />
              {!collapsed && <span>Accounts</span>}
            </div>
            {!collapsed &&
              (openMenu.accounts ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </button>
          {!collapsed && openMenu.accounts && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/invoices" className={navClasses}>
                Invoices
              </NavLink>
              <NavLink to="/vendors" className={navClasses}>
                Vendors
              </NavLink>
              <NavLink to="/accounts/expenses" className={navClasses}>
                Expenses
              </NavLink>
              <NavLink to="/accounts/reports" className={navClasses}>
                Reports
              </NavLink>
            </div>
          )}
        </div>

        {/* HUMAN RESOURCE */}
        <div>
          <button
            onClick={() => toggleMenu("hr")}
            className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              {!collapsed && <span>Human Resource</span>}
            </div>
            {!collapsed &&
              (openMenu.hr ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </button>
          {!collapsed && openMenu.hr && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/human_resource/employees" className={navClasses}>
                Employees
              </NavLink>
              <NavLink to="/human_resource/departments" className={navClasses}>
                Departments
              </NavLink>
              <NavLink to="/human_resource/attendance" className={navClasses}>
                Attendance
              </NavLink>
              <NavLink to="/human_resource/payroll" className={navClasses}>
                Payroll
              </NavLink>
            </div>
          )}
        </div>

        {/* INVENTORY */}
        <div>
          <button
            onClick={() => toggleMenu("inventory")}
            className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <Box size={18} />
              {!collapsed && <span>Inventory</span>}
            </div>
            {!collapsed &&
              (openMenu.inventory ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </button>
          {!collapsed && openMenu.inventory && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/inventory/items" className={navClasses}>
                Items
              </NavLink>
              <NavLink to="/inventory/categories" className={navClasses}>
                Categories
              </NavLink>
              <NavLink to="/inventory/stock" className={navClasses}>
                Stock
              </NavLink>
              <NavLink to="/inventory/purchase-orders" className={navClasses}>
                Purchase Orders
              </NavLink>
            </div>
          )}
        </div>

        {/* SALES */}
        <div>
          <button
            onClick={() => toggleMenu("sales")}
            className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} />
              {!collapsed && <span>Sales</span>}
            </div>
            {!collapsed &&
              (openMenu.sales ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </button>
          {!collapsed && openMenu.sales && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/sales/customers" className={navClasses}>
                Customers
              </NavLink>
              <NavLink to="/sales/quotations" className={navClasses}>
                Quotations
              </NavLink>
              <NavLink to="/sales/orders" className={navClasses}>
                Orders
              </NavLink>
              <NavLink to="/sales/invoices" className={navClasses}>
                Invoices
              </NavLink>
            </div>
          )}
        </div>

        {/* MASTER DATA */}
        <div>
          <button
            onClick={() => toggleMenu("master")}
            className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <Settings size={18} />
              {!collapsed && <span>Master Data</span>}
            </div>
            {!collapsed &&
              (openMenu.master ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </button>
          {!collapsed && openMenu.master && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/master_data/vendors" className={navClasses}>
                Vendors
              </NavLink>
              <NavLink to="/master_data/units" className={navClasses}>
                Units
              </NavLink>
              <NavLink to="/master_data/tax" className={navClasses}>
                Tax Settings
              </NavLink>
              <NavLink to="/master_data/settings" className={navClasses}>
                General Settings
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-gray-300 active:bg-gray-400"
      ></div>
    </aside>
  );
}
