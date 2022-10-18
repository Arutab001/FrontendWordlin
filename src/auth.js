document.getElementById("auth-input__log-in-button").addEventListener("click", async () => {

    const typeRegistration = document.querySelector('.toggle-button').checked;
    const validEmail = validateEmail(document.getElementById("auth-input-mail__input").value);
    document.getElementById("auth-input-mail__invalid-input").style.visibility = getVisibility(validEmail);

    const validPassword = document.getElementById("auth-input-password__input").value.length >= 8;
    document.getElementById("auth-input-password__invalid-input").style.visibility = getVisibility(validPassword);

    if (typeRegistration) {

        const validEmail = document.getElementById("auth-input-password-again__input").value.length >= 8;
        document.getElementById("auth-input-password-again__invalid-input").style.visibility = getVisibility(validEmail);

        const validPassword = document.getElementById("auth-input-username__input").value.length >= 5;
        document.getElementById("auth-input-username__invalid-input").style.visibility = getVisibility(validPassword);

        //    if (validEmail && validPassword) {
        //        fetch('http://localhost:8080/api/v1/user/1').then(response => response.json()).then(data =>
        //            console.log(data));
        //    }
    }
})

document.getElementById("toggle-button").addEventListener("input", async function () {

    const typeRegistration = this.checked

    document.getElementById("auth-title__type-choice__text").innerHTML = getTypeRegistration(typeRegistration);
    document.getElementById("auth-title__type-auth").innerHTML = getTypeRegistration(!typeRegistration);

    document.getElementById("auth-input-username").style.display = getDisplay(!typeRegistration);
    document.getElementById("auth-input-password-again").style.display = getDisplay(!typeRegistration);


    document.getElementById("auth-input-password__input").style.borderRadius = typeRegistration ? "0 0 0 0" : "0 0 10px 10px";
})

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

function getVisibility(isValid) {
    return isValid ? 'hidden' : 'visible';
}

function getDisplay(display) {
    return display ? 'none' : 'block';
}

function getTypeRegistration(type) {
    return type ? 'Log In' : 'Sign Up';
}
