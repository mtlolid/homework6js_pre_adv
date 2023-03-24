const sel = (selector) => document.querySelector(selector);

// Div hide

const hide = () => {
    sel('.signUp').classList.toggle('hiden');
    sel('.signIn').classList.toggle('hiden');
}

sel('.signUpNow').onclick = hide;
sel('.signInNow').onclick = hide;

// Регулярні вирази

let check = [false, false, false, false];
let uniqueCheck = false;

let wrapFunc = (n, reg) => {
    let wrap = document.querySelectorAll('.inputWrap')[n];
    if (reg.test(event.target.value)) {
        check[n] = true;

        wrap.classList.add('afterGood');
        wrap.classList.remove('afterBad');
        wrap.classList.remove('showBefore');
    }
    else {
        check[n] = false;

        wrap.classList.remove('afterGood');
        wrap.classList.add('afterBad');
        wrap.classList.add('showBefore');
    }
}

const nameCheck = /^[a-zA-z]{3,16}$/;
const emailCheck = /^\S*@\S*$/;
const passwordCheck = /^\S{6,16}$/;

signUpForm.firstName.oninput = wrapFunc.bind(null, 0, nameCheck);
signUpForm.lastName.oninput = wrapFunc.bind(null, 1, nameCheck);
signUpForm.password.oninput = wrapFunc.bind(null, 3, passwordCheck);

signUpForm.emailAddress.oninput = () => {
    if(localStorage.getItem(signUpForm.emailAddress.value) == null){
        document.querySelector('.alreadyExist').style.display = 'none'; 
        uniqueCheck = true;
    }
    else{
        document.querySelector('.alreadyExist').style.display = 'block'; 
        uniqueCheck = false;
    }

    wrapFunc(2, emailCheck);
};


// Local storage

// Sign up

signUpForm.signUpButton.onclick = () => {
    if (check.every(value => value == true) && uniqueCheck) {
        let emailKey = signUpForm.emailAddress.value;
        let personData = {
            firstName: signUpForm.firstName.value,
            lastName: signUpForm.lastName.value,
            password: signUpForm.password.value
        };

        localStorage.setItem(emailKey, JSON.stringify(personData)); 
        signUpForm.firstName.value = '';
        signUpForm.lastName.value = '';
        signUpForm.emailAddress.value = '';
        signUpForm.password.value = '';

    }
};

// Sign in

const hideSignIn = () =>{
    sel('.signIn').classList.toggle('hiden');
    sel('.profile').classList.toggle('hiden');
};

sel('.profile__button').onclick = hideSignIn;

signInForm.signInButton.onclick = () =>{
    if (localStorage.length == 0){
        sel('.emptyStorage').style.display = 'block';
    }

    else if(localStorage.getItem(signInForm.emailAddress.value) != null && signInForm.password.value == JSON.parse(localStorage.getItem(signInForm.emailAddress.value)).password){
        sel('.emptyStorage').style.display = 'none';
        sel('.invalidPassword').style.display = 'none';

        let obj = JSON.parse(localStorage.getItem(signInForm.emailAddress.value));
        sel('.profile__name').innerHTML = `${obj.firstName} ${obj.lastName}`
        sel('.profile__email').innerHTML = signInForm.emailAddress.value;

        signInForm.emailAddress.value = '';
        signInForm.password.value = '';

        hideSignIn();
    }
    else{
        sel('.invalidPassword').style.display = 'block';
    }
};