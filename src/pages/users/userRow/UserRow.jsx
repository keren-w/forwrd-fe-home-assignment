
import {useState} from 'react';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';
import { useUsersContext, actionTypes } from '../../../context/usersContext';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user }) => {
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const { dispatchUserActions } = useUsersContext();

  return (
    <div className={styles.userRow}>
      {['name', 'country', 'email', 'phone'].map((fieldName, idx) => fieldName !== "id" && <InputField 
        key={idx}
        name={fieldName} 
        value={user[fieldName].value}
        disabled={isDisabled}
        onChangehandler={(fieldName, value) => dispatchUserActions({
          type: actionTypes.UPDATE_FIELD, 
          metaData: {
            userId: user.id.value, 
            fieldName,
            value
          }
        })}
        error={user[fieldName].errors?.length>0 || user[fieldName].isEmpty}
        placeholder='ssddf'
      />)}      
      {/* Render each user row inputs and trash icon at the end of each row */}
      <TrashIconButton />
    </div>
  );
};

export default UserRow;

export const UserInput = props => {
  const [value, setValue] = useState(props.value);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (fieldName, value) => {
    const isError = validateInput(fieldName, value);
    const isEmpty = !value
    setValue(value)
  };

  const {fieldName} = props;
  return <InputField 
  name={fieldName} 
  value={value}
  disabled={isDisabled}
  onChangehandler={handleInput}
  error={error}
  placeholder={`Please enter ${fieldName}`}
/>
};
