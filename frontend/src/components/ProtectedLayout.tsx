import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UserDataType from '../types/UserDataType';

type AuthData = {
  user: UserDataType | null; // The current user object or null if not authenticated
  login: (data: UserDataType) => Promise<void>; // Function to authenticate the user
  logout: () => void; // Function to sign out the logged-in user
};

export const ProtectedLayout = () => {
  const { user }: AuthData = useAuth();

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
