import { createContext, useContext, useState, useEffect, useMemo, useReducer } from 'react';
import data from '../data/initialUsersData.json';
import { validateField } from '../pages/users/users.utils';

// initial value
const UsersContext = createContext({
  userList: [],
  setUserList: () => {},
  usersData: {},
  dispatchUserActions: () => {},
  loading: false,
});

export const actionTypes = {
    UPDATE_FIELD: 'updateField',
    LOAD_FIELDS: 'loadFields'
};

const userDataReducer = (state, {type, metaData}) => {
  if (type === actionTypes.UPDATE_FIELD) {
    const {userId, fieldName, value} = metaData;
    return {
      ...state,
      [userId]: {
        ...state[userId],
        [fieldName]: {
            value,
          ...validateField(fieldName, value)
        }
      }
    }
  }
  if (type === actionTypes.LOAD_FIELDS) {
    return metaData.normalizedData;
  }
  return state;
};

// value provider
export const ContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [usersData, dispatchUserActions] = useReducer(userDataReducer, {});
  const [loading, setLoading] = useState(false);

  // console.log('usersData', usersData);

  useEffect(() => {
    let t;
    const savedData = window.localStorage.getItem('FWD_AI');
    if (savedData) {
      const {userList, usersData} = JSON.parse(savedData);
      // setUsersData(JSON.parse(savedData).usersData);
      setUserList(userList);
      dispatchUserActions({type: actionTypes.LOAD_FIELDS, metaData: {normalizedData: usersData}})
    }

    else {
      setLoading(true);
      t = setTimeout(() => {
        const usersArray = data.map(user => user.id);
        const normalizedData = data.reduce((acc, user) => ({
          ...acc,
          [user.id]: Object.keys(user).reduce((acc, fieldName) => ({
            ...acc,
            [fieldName]: {
              value: user[fieldName],
              errors: [], 
              isEmpty: false
            }
          }), {})
        }), {});
        setUserList(usersArray);
        dispatchUserActions({type: actionTypes.LOAD_FIELDS, metaData: {normalizedData}})
        window.localStorage.setItem('FWD_AI', JSON.stringify({
          userList: usersArray,
          usersData: normalizedData
        }))
        setLoading(false);
      }, 2000);
    }

    return () => {
      t && clearTimeout(t);
    };
  }, []);

  const getUserErrors = (userData) => Object.keys(userData).reduce((acc, fieldName) => acc+!!userData[fieldName].errors?.length, 0);
  const getUserEmptyFields = (userData) => Object.keys(userData).reduce((acc, fieldName) => parseInt(acc+userData[fieldName].isEmpty), 0);
  const contextValue = useMemo(() => {
    const errorCount = userList.reduce((acc, userId) => acc+getUserErrors(usersData[userId]), 0)
    const emptyFieldsCount = userList.reduce((acc, userId) => acc+getUserEmptyFields(usersData[userId]), 0)
    return {
    loading,
    userList,
    usersData,
    dispatchUserActions,
    errorCount,
    emptyFieldsCount
  }}, [usersData, loading, userList]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
