import { styled } from '@mui/material/styles';
import { Autocomplete } from '@mui/material';
import InputField from './InputField';
import { TextField } from '@mui/material';

const StyledAutoCompleteField = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

const AutocompleteField = (props) => {
  const {options, onChangehandler} = props;
  return <StyledAutoCompleteField
    options={options}
    value={props.value}
    renderInput={(props) => <TextField sx={{ color: 'green' }} {...props} />}
  />;
};

// TODO: Implement passed props
AutocompleteField.defaultProps = {};

export default AutocompleteField;
