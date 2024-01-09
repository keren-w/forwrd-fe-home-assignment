import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  backgroundColor: '#232d85',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
  },
  '&:disabled': {
    backgroundColor: 'rgba(50, 112, 174, 0.5)',
    color: 'rgba(255, 255, 255, 0.3)',
  }
});

const PrimaryButton = ({ children, disabled, handleClick }) => {
  return (
    <StyledButton variant="contained" disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

// TODO: Implement passed props
PrimaryButton.defaultProps = {
  children: null,
  disabled: false,
  handleClick: () => {},
};

export default PrimaryButton;
