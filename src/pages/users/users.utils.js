
export const validateField = (fieldName, value) => {
    if (fieldName === 'name') {
      return validateName(value);
    ;}
    if (fieldName === 'email') {
      return validateEmail(value);
    ;}
    if (fieldName === 'country') {
      return validateCountry(value);
    ;}  
    if (fieldName === 'phone') {
      return validatePhone(value);
    ;}
  };
  
  const validateName = (value) => { 
    if (!value) {
        return {
            errors: [], 
            isEmpty: true
        }
    }
        return {
            errors: [], 
            isEmpty: false
        };
    };
  const validateEmail = (value) => { 
    if (!value) {
        return {
            errors: [], 
            isEmpty: true
        }
    }
    return {
        errors: [], 
        isEmpty: false
    };
};
  const validateCountry = (value) => { 
    if (!value) {
        return {
            errors: [], 
            isEmpty: true
        }
    }
    return {
        errors: [], 
        isEmpty: false
    };
};
  const validatePhone = (value) => {
    if (!value) {
        return {
            errors: [], 
            isEmpty: true
        }
    }
    if (value[0] != '+' || value.split('+')?.length>2) {
        return {
            errors: ['kmlkm'], 
            isEmpty: false
        };
    }
    return {
        errors: [], 
        isEmpty: false
    };
  };

export class User {
    constructor(user) {
        this.id = {
            value: user?.id || '',
        }
        this.isNewUser = user?.isNewUser || true,
        this.name = {
            value: user?.name || '',
            errors: [], 
            isEmpty: false
        }
        this.country = {
            value: user?.name || '',
            errors: [], 
            isEmpty: false
        }
        this.email = {
            value: user?.name || '',
            errors: [], 
            isEmpty: false
        }
        this.phone = {
            value: user?.name || '',
            errors: [], 
            isEmpty: false
        }
    }
}

export const DISPLAYED_USER_FIELDS = ['name', 'country', 'email', 'phone'];