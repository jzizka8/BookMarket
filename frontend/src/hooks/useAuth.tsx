import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: any) => {
    // A function used to authenticate the user. I think we need to validate the data in here.
    setUser(data);
    navigate('/');
  };

  // call this function to sign out logged-in user
  const logout = () => {
    setUser(null);
    // The { replace: true } option is used to
    // replace the current URL in the history stack,
    // preventing the user from going back to the previous authenticated state.
    navigate('/', { replace: true });
  };

  // A memoized object that holds the user, login, and logout values.
  // It is created using useMemo and will only update when the user state changes.
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// This hook is used to access the authentication state
// and functions within components. It returns the AuthContext
// using useContext, which gives access to the user, login, and logout
// values provided by the AuthProvider.
export const useAuth = () => {
  return useContext(AuthContext);
};
