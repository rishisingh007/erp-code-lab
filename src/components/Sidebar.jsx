import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Box as BoxIcon,
  ShoppingCart,
  Settings,
  Briefcase,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

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

  const toggleMenu = (key) => setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const isActive = (to, exact = false) => {
    if (exact) return pathname === to;
    return pathname === to || pathname.startsWith(to + "/");
  };

  const SectionHeader = ({ icon, label, openKey }) => (
    <ListItemButton onClick={() => toggleMenu(openKey)} sx={{ borderRadius: 1 }}>
      <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>
      {!collapsed && <ListItemText primary={label} />}
      {!collapsed && (openMenu[openKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
    </ListItemButton>
  );

  const NavItem = ({ to, label, icon, exact }) => (
    <ListItemButton
      component={NavLink}
      to={to}
      selected={isActive(to, exact)}
      sx={{
        borderRadius: 1,
        pl: collapsed ? 1 : 3,
        '&.Mui-selected': { bgcolor: 'action.selected', fontWeight: 600 },
      }}
    >
      {icon && <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>}
      {!collapsed && <ListItemText primary={label} />}
    </ListItemButton>
  );

  return (
    <Box
      component="aside"
      sx={{
        position: 'relative',
        width: collapsed ? 64 : width,
        bgcolor: 'background.default',
        borderRight: 1,
        borderColor: 'divider',
        transition: 'width 200ms',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        {!collapsed && (
          <Typography variant="subtitle1" fontWeight={600}>
            ERP System
          </Typography>
        )}
        <IconButton size="small" onClick={toggleCollapse}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={{ p: 1, color: 'text.primary', overflowY: 'auto', flex: 1 }}>
        <List dense disablePadding>
          {/* Dashboard */}
          <NavItem to="/" label="Dashboard" icon={<FileText size={18} />} exact />

          {/* ACCOUNTS */}
          <SectionHeader icon={<Briefcase size={18} />} label="Accounts" openKey="accounts" />
          <Collapse in={!collapsed && openMenu.accounts} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ ml: collapsed ? 0 : 4 }}>
              <NavItem to="/invoices" label="Invoices" />
              <NavItem to="/vendors" label="Vendors" />
              <NavItem to="/accounts/expenses" label="Expenses" />
              <NavItem to="/accounts/reports" label="Reports" />
            </List>
          </Collapse>

          {/* HUMAN RESOURCE */}
          <SectionHeader icon={<Users size={18} />} label="Human Resource" openKey="hr" />
          <Collapse in={!collapsed && openMenu.hr} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ ml: collapsed ? 0 : 4 }}>
              <NavItem to="/human_resource/employees" label="Employees" />
              <NavItem to="/human_resource/departments" label="Departments" />
              <NavItem to="/human_resource/attendance" label="Attendance" />
              <NavItem to="/human_resource/payroll" label="Payroll" />
            </List>
          </Collapse>

          {/* INVENTORY */}
          <SectionHeader icon={<BoxIcon size={18} />} label="Inventory" openKey="inventory" />
          <Collapse in={!collapsed && openMenu.inventory} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ ml: collapsed ? 0 : 4 }}>
              <NavItem to="/inventory/items" label="Items" />
              <NavItem to="/inventory/categories" label="Categories" />
              <NavItem to="/inventory/stock" label="Stock" />
              <NavItem to="/inventory/purchase-orders" label="Purchase Orders" />
            </List>
          </Collapse>

          {/* SALES */}
          <SectionHeader icon={<ShoppingCart size={18} />} label="Sales" openKey="sales" />
          <Collapse in={!collapsed && openMenu.sales} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ ml: collapsed ? 0 : 4 }}>
              <NavItem to="/sales/customers" label="Customers" />
              <NavItem to="/sales/quotations" label="Quotations" />
              <NavItem to="/sales/orders" label="Orders" />
              <NavItem to="/sales/invoices" label="Invoices" />
            </List>
          </Collapse>

          {/* MASTER DATA */}
          <SectionHeader icon={<Settings size={18} />} label="Master Data" openKey="master" />
          <Collapse in={!collapsed && openMenu.master} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ ml: collapsed ? 0 : 4 }}>
              <NavItem to="/master_data/vendors" label="Vendors" />
              <NavItem to="/master_data/units" label="Units" />
              <NavItem to="/master_data/tax" label="Tax Settings" />
              <NavItem to="/master_data/settings" label="General Settings" />
            </List>
          </Collapse>
        </List>
      </Box>

      {/* Resize Handle */}
      <Box
        onMouseDown={startResizing}
        sx={{ position: 'absolute', top: 0, right: 0, width: 4, height: '100%', cursor: 'col-resize', '&:hover': { bgcolor: 'action.hover' } }}
      />
    </Box>
  );
}
