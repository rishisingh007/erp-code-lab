import { useAuthStore } from "../store/useAuthStore";

export default function PermissionGuard({ permission, children }) {

  const permissions = useAuthStore(s => s.permissions);

  if (!permissions.includes(permission)) {
    return null;
  }

  return children;
}