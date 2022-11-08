document.getElementById("content__add-button").addEventListener('click', async () => {

    let data = [{
        "publicName": document.getElementById("content__input-directory-name").value
    }];

    let response = await fetch(backendUrl + '/translationLists/addTranslationSet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });

    let user = await response.json();
    console.log(user);

    window.location = "./user_word_lists.html";
});
