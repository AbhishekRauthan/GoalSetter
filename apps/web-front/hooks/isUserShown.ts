import { useEffect, useState } from 'react';
import { useAuthStore } from '../feature/store';

const isUserShown = () => {
  const [isUser, setIsUser] = useState(false);
  const { user } = useAuthStore();
  useEffect(() => {
    user ? setIsUser(true) : setIsUser(false);
  }, [user]);

  return {isUser, setIsUser};
};

export default isUserShown;
