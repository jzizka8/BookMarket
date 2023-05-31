import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedLayout = () => {
  const { user }: any = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <nav>
        <Link to="/allBooks">All Books</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Outlet />
    </div>
  );
};
