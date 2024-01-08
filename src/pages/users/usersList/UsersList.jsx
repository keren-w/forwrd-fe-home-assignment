import {useState, useEffect, useRef} from 'react';
import { Button, Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';

const THRESHOLD_PERCENTAGE = 80;

function UsersList() {
  const [visibleRows, setVisibleRows] = useState(10);
  const scrollContainer = useRef(null);
  const { userList, usersData } = useUsersContext();

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
        <AddButton />
      </div>
      <div className={styles.usersListContent} ref={scrollContainer} onScroll={e => handleScroll(e, visibleRows)}>
        <div>{userList?.slice(0, visibleRows).map((userId, idx) => (
          idx<visibleRows && <div key={userId} style={{display:'flex'}}>
            {idx+1}
            <UserRow key={userId} user={usersData[userId]} />
          </div>
        ))}</div>
      </div>
    </div>
  );
}

export default UsersList;
