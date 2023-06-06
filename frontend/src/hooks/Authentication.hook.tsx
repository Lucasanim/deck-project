import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAuthentication = () => {
  const accessToken = useSelector(state => state.auth?.token?.accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return isLoggedIn;
};

export default useAuthentication;