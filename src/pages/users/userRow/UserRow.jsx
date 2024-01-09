
import {useState} from 'react';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';
import { useUsersContext, actionTypes } from '../../../context/usersContext';
import {DISPLAYED_USER_FIELDS} from '../users.utils';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { dispatchUserActions } = useUsersContext();
  const {isNewUser} = user;

  return (
    <div className={styles.userRow}>
      {DISPLAYED_USER_FIELDS.map((fieldName, idx) => <InputField 
        key={idx}
        name={fieldName} 
        value={user[fieldName].value}
        disabled={isDisabled}
        onChangehandler={(fieldName, value) => dispatchUserActions({
          type: actionTypes.UPDATE_USER, 
          metaData: {
            userId: user.id.value, 
            fieldName,
            value
          }
        })}
        onBlurHandler={() => isNewUser && dispatchUserActions({type: actionTypes.VALIDATE_USER_FIELDS, metaData: {userId: user.id.value}})}
        error={user[fieldName].errors?.length>0 || user[fieldName].isEmpty}
        placeholder={`Please enter ${fieldName}`}
      />)}      
      {/* Render each user row inputs and trash icon at the end of each row */}
      <TrashIconButton />
    </div>
  );
};

export default UserRow;
