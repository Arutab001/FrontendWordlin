(async () => {

    let token = localStorage.getItem(keyToken)

    let response = await fetch(backendUrl + '/user/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });

    let user = await response.json();
    console.log(user);

    document.getElementById("header-profile__username").textContent = user.username
})()