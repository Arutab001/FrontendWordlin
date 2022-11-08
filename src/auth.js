document.getElementById("auth-input__log-in-button").addEventListener("click", async () => {

    const typeRegistration = document.querySelector('.toggle-button').checked;
    let emailInput = document.getElementById("auth-input-mail__input").value;
    const validEmail = validateEmail(emailInput);
    document.getElementById("auth-input-mail__invalid-input").style.visibility = getVisibility(validEmail);

    let passwordInput = document.getElementById("auth-input-password__input").value;
    const validPassword = passwordInput.length >= 8;
    document.getElementById("auth-input-password__invalid-input").style.visibility = getVisibility(validPassword);

    if (typeRegistration) {

        const usernameInput = document.getElementById("auth-input-password-again__input").value;
        const validUsername = usernameInput.length >= 5;
        document.getElementById("auth-input-password-again__invalid-input").style.visibility = getVisibility(validUsername);

        const validRepeatPassword = document.getElementById("auth-input-username__input").value === passwordInput;
        document.getElementById("auth-input-username__invalid-input").style.visibility = getVisibility(validPassword);

        if (validEmail && validUsername && validPassword && validRepeatPassword) {

            if (validEmail && validPassword) {
                let user = {
                    username: `${usernameInput}`,
                    email: `${emailInput}`,
                    password: `${passwordInput}`
                };

                let response = await fetch(backendUrl + '/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(user)
                });

                let result = await response.json();
                console.log(result);
                location.reload();
            }
        }

    } else {

        console.log(validEmail);
        console.log(validPassword);
        if (validEmail && validPassword) {

            let response = await fetch(backendUrl + '/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Basic ' + btoa(`${emailInput}:${passwordInput}`),
                },
            });
            let token = await response.text();
            console.log(token)
            localStorage.setItem(keyToken, token);
            window.location = "./main.html";
        }
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
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
