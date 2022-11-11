(async () => {

})();

document.getElementById('submit').addEventListener('click', async () => {

    let nativeLanguage = document.getElementById('nativeLanguage').value;
    console.log(nativeLanguage);
    let targetLanguage = document.getElementById('targetLanguage').value;
    console.log(targetLanguage);

    user.nativeLanguage = nativeLanguage;
    user.targetLanguage = targetLanguage;

    let response = await fetch(backendUrl + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    console.log(result);

    window.location = './main.html'
})
