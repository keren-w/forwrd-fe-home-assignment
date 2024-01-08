import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  loading: false,
});

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('usersData', usersData);

  useEffect(() => {
    let t;
    const savedData = window.localStorage.getItem('FWD_AI');
    if (savedData) {
      setUsersData(JSON.parse(savedData).usersData);
    }

    else {
      t = setTimeout(() => {
        setUsersData(data);
        window.localStorage.setItem('FWD_AI', JSON.stringify({
          usersData: data
        }))
      }, 2000);
    }

    return () => {
      t && clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(() => ({ usersData, setUsersData }), [usersData]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
