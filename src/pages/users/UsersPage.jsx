import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { Loader } from '../../components/Loader';
import {useUsersContext} from '../../context/usersContext'

function UsersPage() {

  const { loading, errorCount, emptyFieldsCount} = useUsersContext();
  if (loading) {
    return <Loader/>
  };  

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
        <div className={styles.counterContainer}>
        <div>Invalid Fields: {errorCount}</div>
        <div>Empty Fields: {emptyFieldsCount}</div>
        </div>
          <PrimaryButton
            disabled={errorCount+emptyFieldsCount>0}
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
