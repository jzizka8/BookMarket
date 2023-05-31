import UserDataType from './UserDataType';

type AuthContextType = {
  user: UserDataType | null;
  login: (data: UserDataType) => Promise<void>;
  logout: () => void;
};

export default AuthContextType;
