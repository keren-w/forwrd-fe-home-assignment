import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { Loader } from '../../components/Loader';
import {useUsersContext} from '../../context/usersContext'

function UsersPage() {

  const { loading, errorCount, emptyFieldsCount, disableActions} = useUsersContext();
  if (loading) {
    return <div className={styles.loaderWrapper}><Loader/></div>
  }

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
            disabled={disableActions}
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
