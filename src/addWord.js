(async () => {
    if (new URLSearchParams(location.search).get('wordId')) {
        let id = new URLSearchParams(location.search).get(wordId);
        document.getElementById('content__input-word-name');
        let response = await fetch(backendUrl + '/word/' + id, {
            method: 'GET',
        })

        let data = await response.json();
        console.log(data);
        document.getElementById('content__input-word-name').value = data.word.word
        let translationsBlock = document.getElementsByClassName('content-input__word input-text transparency');

        translationsBlock[0].value = data.translation[0].word

        for (let i = 1; i < data.translation.length; i++) {
            document.getElementById('content__add-translate-button').click();
            const it = data.translation[i];
            translationsBlock[i].value = it.word
        }
    }
})();

document.getElementById("content__add-word-button").addEventListener("click", async () => {

    let idWord = new URLSearchParams(location.search).get(wordId);
    let idListSet = new URLSearchParams(location.search).get(idList);

    let word = document.getElementById("content__input-word-name").value;

    let translationWord = document.getElementsByClassName("content-input__word");

    if (document.getElementById('content__input-word-name').value === '') {
        document.getElementById('word-input__field-must-be-filled').style.display = 'block';
        return
    } else {
        document.getElementById('word-input__field-must-be-filled').style.display = 'none';
    }

    if (document.getElementById('content__input-translate-name').value === '') {

        document.getElementById('translate-input__field-must-be-filled').style.display = 'block';
        return
    } else {
        document.getElementById('translate-input__field-must-be-filled').style.display = 'none';
    }

    let arraysTranslation = [];
    for (let translationWordElement of translationWord) {
        if (translationWordElement.value !== '')
            arraysTranslation.push({word: translationWordElement.value});
    }

    let response = await fetch(backendUrl + '/translationLists/' + idListSet, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        }
    });

    let translation = await response.json();

    console.log(translation);
    let response1;

    if (idWord) {

        let tWord = {
            "id": idWord,
            "word": {
                "word": word
            },
            "nativeLanguage": user.nativeLanguage,
            "targetLanguage": user.targetLanguage,
            "translation": arraysTranslation
        };

        response1 = await fetch(backendUrl + '/word/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(tWord)

        });
    } else {
        console.log('testesfse');
        translation.translations.push({
                "word": {
                    "word": word
                },
                "nativeLanguage": user.nativeLanguage,
                "targetLanguage": user.targetLanguage,
                "translation": arraysTranslation
            }
        );

        response1 = await fetch(backendUrl + '/translationLists/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(translation)

        });
    }

    console.log(translation);

    //add
    let translationResponse = await response1.json();
    console.log(translationResponse);

    window.location = "./words.html?idList=" + idListSet;
})

document.getElementById('content__add-translate-button').addEventListener('click', async () => {

    let translate = document.getElementsByClassName('content-input__word input-text');
    if (translate[translate.length - 1].value !== '') {
        let divTranslations = document.getElementById('translations');

        let node = translate[0].cloneNode(true);
        node.value = '';

        let word = document.createElement("div");
        word.classList.add("word-block");

        let buttonRemove = document.createElement("button");
        buttonRemove.classList.add("transparency");
        buttonRemove.textContent = "remove";
        buttonRemove.style.backgroundColor = 'rgba(255,46,46,0.3)';
        buttonRemove.style.marginLeft = '10px';

        buttonRemove.addEventListener('click', async () => {
            word.remove();
        });

        word.append(node);
        word.append(buttonRemove);
        word.style.display = 'flex';

        divTranslations.append(word);
    }
})

