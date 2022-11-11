let user;
(async () => {

    await getUser();

    document.getElementById("header-profile__username").textContent = user.username
})()

async function getUser() {

    let response = await fetch(backendUrl + '/user/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        window.location = './logIn.html'
    }

    user = await response.json();
    console.log(user);
}
