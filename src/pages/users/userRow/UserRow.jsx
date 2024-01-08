
import {useState} from 'react';
import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

// { name, value, onChangehandler, error, disabled, placeholder }

const UserRow = ({ user }) => {
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // const {name, country, email, phone} = user;

  return (
    <div className={styles.userRow}>
      {Object.keys(user).map((field, idx) => field !== "id" && <InputField 
        key={idx}
        name={field} 
        value={user[field]}
        disabled={isDisabled}
        onChangehandler={() => {}}
        error={error}
        placeholder='ssddf'
      />)}      
      {/* Render each user row inputs and trash icon at the end of each row */}
      <TrashIconButton />
    </div>
  );
};

export default UserRow;
