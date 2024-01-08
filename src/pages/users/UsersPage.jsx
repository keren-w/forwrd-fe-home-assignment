import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { Loader } from '../../components/Loader';
import {useUsersContext} from '../../context/usersContext'

function UsersPage() {

  const { loader, errorCount, emptyFieldsCount} = useUsersContext();
  if (loader) {
    return <Loader/>
  };  

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
        <div>Invalid Fields: {errorCount}</div>
        <div>Empty Fields: {emptyFieldsCount}</div>
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
