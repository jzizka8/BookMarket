import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthContextType from '../types/AuthContextType';

export const MainLayout = () => {
  const { user }: AuthContextType = useAuth();

  //We do not want authenticated users to access the /login path
  if (user) {
    return <Navigate to="/allBooks" />;
  }

  return (
    <div>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
