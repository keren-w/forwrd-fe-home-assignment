import {useState, useEffect, useRef} from 'react';
import { Button, Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useUsersContext, actionTypes } from '../../../context/usersContext';

const THRESHOLD_PERCENTAGE = 80;

function UsersList() {
  const [visibleRows, setVisibleRows] = useState(10);
  const scrollContainer = useRef(null);
  const { userList, usersData, dispatchUserActions, errorCount, emptyFieldsCount } = useUsersContext();

  const handleScroll = (e, visibleRows) => {
    const scrollContainer = e.target;
    const content = scrollContainer.children[0];
    const scrollPercentage = (scrollContainer.scrollTop / (content.scrollHeight - scrollContainer.clientHeight)) * 100;
    if (scrollPercentage >= THRESHOLD_PERCENTAGE && visibleRows<userList?.length) {
      setVisibleRows(visibleRows+10);
    }
  }

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({userList?.length || 0})</Typography>
        <AddButton 
          handleClick={() => dispatchUserActions({type: actionTypes.ADD_USER})}
          disabled={errorCount+emptyFieldsCount>0}
        />
      </div>
      <div className={styles.usersListContent} ref={scrollContainer} onScroll={e => handleScroll(e, visibleRows)}>
        <div>{userList?.slice(0, visibleRows).map((userId, idx) => (
          idx<visibleRows && <div key={userId} className={styles.rowWrapper}>
            <span>{idx+1}</span>
            <UserRow key={userId} user={usersData[userId]} />
          </div>
        ))}</div>
      </div>
    </div>
  );
}

export default UsersList;
