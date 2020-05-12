import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { CircularProgress } from '@material-ui/core';
import { isAuthenticated } from '../api/authApi';

export const AuthContext = createContext(null);

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const providerValue = useMemo(
    () => ({ user, setUser, isAuth, setIsAuth }),
    [user, setUser, isAuth, setIsAuth],
  );

  useEffect(() => {
    isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuth(data.isAuthenticated);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <AuthContext.Provider value={providerValue}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
