import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;
