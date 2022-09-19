const firstNameEl = document.querySelector('#firstname');
const lastNameEl = document.querySelector('#lastname')
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone')
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup-form');

const togglePassword = document.querySelector('#togglePassword')
const confirmTogglePassword = document.querySelector('#confirmTogglePassword')

togglePassword.addEventListener('click', function(){
    const type = passwordEl.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordEl.setAttribute('type', type)
    this.classList.toggle('bi-eye')
})

confirmTogglePassword.addEventListener('click', function(){
    const type = confirmPasswordEl.getAttribute('type') === 'password' ? 'text' : 'password'
    confirmPasswordEl.setAttribute('type', type)
    this.classList.toggle('bi-eye')
})


const checkFirstName = () => {

    let valid = false;

    const firstName = firstNameEl.value.trim();

    if (!isRequired(firstName)) {
        showError(firstNameEl, 'first name cannot be blank.');
    } else if (!isFirstnameValid(firstName)) {
        showError(firstNameEl, `first name is not valid.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastname = () => {

    let valid = false;

    const lastName = lastNameEl.value.trim();

    if (!isRequired(lastName)) {
        showError(lastNameEl, 'last name cannot be blank.');
    } else if (!isFirstnameValid(lastName)) {
        showError(firstNameEl, `last name is not valid.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    
    let valid = false;
    
    const email = emailEl.value.trim();
    
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPhone = () => {

    let valid = false;
    
    const phone = phoneEl.value.trim();
    
    if (!isRequired(phone)) {
        showError(phoneEl, 'phone cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(phoneEl, 'phone is not valid.')
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
}


const checkPassword = () => {
    
    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    
    let valid = false;

    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isFirstnameValid = (firstName) => {
    const re = new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm)
    return re.test(firstName)
}

const isLastnameValid = (lastName) => {
    const re = new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm)
    return re.test(lastName)
}

const isPhoneValid = (phone) => {
    const re = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
    return re.test(phone);
}

const isEmailValid = (email) => {
    
    const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;

const showError = (input, message) => {

    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    
    const formField = input.parentElement;
    
    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}

form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isFirstnameValid = checkFirstName(),
        isLastnameValid = checkLastname(),
        isPhoneValid = checkPhone(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isFirstnameValid &&
        isLastnameValid &&
        isPhoneValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'firstname':
            checkFirstName();
            break;
        case 'lastname':
            checkLastname();
            break;
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));