import { createContext, useContext, useState, useEffect, useMemo, useReducer } from 'react';
import data from '../data/initialUsersData.json';
import { validateField, DISPLAYED_USER_FIELDS } from '../pages/users/users.utils';
import { User } from '../pages/users/users.utils';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';

// initial value
const UsersContext = createContext({
  userList: [],
  setUserList: () => {},
  usersData: {},
  dispatchUserActions: () => {},
  loading: false,
});

export const actionTypes = {
    UPDATE_USER: 'updateUsers',
    LOAD_USERS: 'loadUsers',
    ADD_USER: 'addUser',
    VALIDATE_USER_FIELDS: 'validateUserFields',
    DELETE_USER: 'deleteUser',
};

const userDataReducer = (state, {type, metaData}) => {
  if (type === actionTypes.UPDATE_USER) {
    const {userId, fieldName, value} = metaData;
    return {
      ...state,
      usersData: {
        ...state.usersData,
        [userId]: {
          ...state.usersData[userId],
          [fieldName]: {
              value,
            ...validateField(fieldName, value)
          }
        }
      }
    }
  }
  if (type === actionTypes.LOAD_USERS) {
    return {
      userList: metaData.userList,
      usersData: metaData.normalizedData
    };
  }
  if (type === actionTypes.ADD_USER) {
    const newId = uuidv4();
    return {
      userList: [newId, ...state.userList],
      usersData: {
        ...state.usersData,
      [newId]: new User({id: newId, isNewUser: true})
      }
    }
  }
  if (type === actionTypes.VALIDATE_USER_FIELDS) {
    const {userId} = metaData;
    const userData = state.usersData[userId];
    const updatedUserData = Object.keys(userData).reduce((acc,fieldName) => ({
      ...acc,
      [fieldName]: {
        ...userData[fieldName],
        ...validateField(fieldName, userData[fieldName].value)
      }
    }), {});
    return {
      ...state,
      usersData: {
        ...state.usersData,
        [userId]: {
          ...updatedUserData,
          isNewUser: false
        }
      }
    }
  }
  if (type === actionTypes.DELETE_USER) {
    const filteredUserList = state.userList.filter(userId => userId !== metaData.userId);
    return {
      userList: filteredUserList,
      usersData: filteredUserList.reduce((acc, userId) => ({
        ...acc,
        [userId]: cloneDeep(state.usersData[userId])
      }), {})
    }
  }
  return state;
};

// value provider
export const ContextProvider = ({ children }) => {
  // const [userList, setUserList] = useState([]);
  const [users, dispatchUserActions] = useReducer(userDataReducer, {
    userList: [],
    usersData: {}
  });
  const [loading, setLoading] = useState(false);

  // console.log('usersData', usersData);

  useEffect(() => {
    let t;
    const savedData = window.localStorage.getItem('FWD_AI');
    if (savedData) {
      const {userList, usersData} = JSON.parse(savedData);
      dispatchUserActions({type: actionTypes.LOAD_USERS, metaData: {normalizedData: usersData, userList}})
    }

    else {
      setLoading(true);
      t = setTimeout(() => {
        const userList = data.map(user => user.id);
        const normalizedData = data.reduce((acc, user) => ({
          ...acc,
          [user.id]: new User({...user, isNewUser: false})
        }), {});
        dispatchUserActions({type: actionTypes.LOAD_USERS, metaData: {normalizedData, userList}})
        window.localStorage.setItem('FWD_AI', JSON.stringify({
          userList,
          usersData: normalizedData
        }))
        setLoading(false);
      }, 2000);
    }

    return () => {
      t && clearTimeout(t);
    };
  }, []);

  const getUserErrors = (userData) => DISPLAYED_USER_FIELDS.reduce((acc, fieldName) => acc+!!userData[fieldName].errors?.length, 0);
  const getUserEmptyFields = (userData) => DISPLAYED_USER_FIELDS.reduce((acc, fieldName) => parseInt(acc+userData[fieldName].isEmpty), 0);
  
  const contextValue = useMemo(() => {
    const {userList, usersData} = users;
    const errorCount = userList.reduce((acc, userId) => acc+getUserErrors(usersData[userId]), 0)
    const emptyFieldsCount = userList.reduce((acc, userId) => acc+getUserEmptyFields(usersData[userId]), 0)
    return {
    loading,
    userList,
    usersData,
    dispatchUserActions,
    errorCount,
    emptyFieldsCount
  }}, [loading, users]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;