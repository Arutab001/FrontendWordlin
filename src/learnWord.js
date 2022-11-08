let translationId;
(async () => {

    let response = await fetch(backendUrl + '/recentlyUsedWord/getOld', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });

    const recentlyUsedWord = await response.json();

    document.getElementById('content-button__text').textContent = recentlyUsedWord.translation.word.word;
    translationId = recentlyUsedWord.id
    console.log(translationId)
})()

document.getElementById('remember').addEventListener('click', async () => {

    let response = await fetch(backendUrl + '/recentlyUsedWord/updateLevel/' + translationId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    });

    const recentlyUsedWord = await response.json();
    console.log(recentlyUsedWord);

    document.location.reload()
})

document.getElementById('dont-remember').addEventListener('click', async () => {

    let response = await fetch(backendUrl + '/recentlyUsedWord/updateTime/' + translationId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    });

    const recentlyUsedWord = await response.json();
    console.log(recentlyUsedWord);

    document.location.reload()
})
