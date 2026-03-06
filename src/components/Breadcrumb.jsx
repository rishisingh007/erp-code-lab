import { useLocation, Link } from "react-router-dom";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500">
      <Link to="/" className="hover:underline">Home</Link>
      {parts.map((part, idx) => {
        const to = "/" + parts.slice(0, idx + 1).join("/");
        return (
          <span key={to}>
            {" / "}
            <Link to={to} className="hover:underline capitalize">{part}</Link>
          </span>
        );
      })}
    </nav>
  );
}
