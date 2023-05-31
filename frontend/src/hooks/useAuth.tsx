import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import UserDataType from '../types/UserDataType';
import AuthContextType from '../types/AuthContextType';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: UserDataType) => {
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
export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};
