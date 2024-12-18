import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, isTokenExpired, logout } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    if (isTokenExpired()) {
      logout();
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};