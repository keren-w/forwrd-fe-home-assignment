import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { Loader } from '../../components/Loader';
import {useUsersContext} from '../../context/usersContext'

function UsersPage() {

  const { usersData } = useUsersContext();
  if (usersData?.length === 0) {
    return <Loader/>
  };  

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={false}
            // TODO: Implement onClick handler
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
