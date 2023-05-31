import { useAuth } from '../hooks/useAuth';
import AuthContextType from '../types/AuthContextType';

const Homepage = () => {
  const { user }: AuthContextType = useAuth();

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      {user ? (
        <>
          {/* Additional features for logged-in users */}
          <button>Buy Books</button>
          {/* Other options/components for logged-in users */}
        </>
      ) : (
        <>
          {/* Content for non-logged-in users */}
          <p>Please log in to access additional features.</p>
        </>
      )}
    </div>
  );
};

export default Homepage;
