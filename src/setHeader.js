let user;
(async () => {
    
    let response = await fetch(backendUrl + '/user/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });

    user = await response.json();
    console.log(user);

    document.getElementById("header-profile__username").textContent = user.username
})()