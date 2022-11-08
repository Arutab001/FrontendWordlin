(async () => {

    let id = new URLSearchParams(location.search).get(idList);
    if (id === null) {
        window.location = "./public_word_lists.html"
    }

    document.getElementById("content__add-word").addEventListener("click", async () => {
        window.location = "./add_word.html?idList=" + id;
    });

    let response = await fetch(backendUrl + '/translationLists/' + id, {
        method: 'GET',
    });

    let words = await response.json();
    console.log(words);

    words.translations.forEach(it => {
        let word = document.createElement("div");
        word.classList.add("word-block");

        let nodes = document.createElement("div");
        nodes.classList.add("word");
        nodes.classList.add("transparency");
        nodes.textContent = it.word.word;

        nodes.addEventListener("click", () => {
            window.location = "./public_word_lists.html?idList=" + it.id;
        });

        word.append(nodes);

        let wordTranslations = document.createElement("div");
        let textTranslations = '';

        console.log(it);
        it.translation.forEach(it => {
            textTranslations += it.word + ', ';
        });

        textTranslations = textTranslations.substring(0, textTranslations.length - 2);

        wordTranslations.textContent = textTranslations;
        wordTranslations.style.color = '#7c7c7c';
        wordTranslations.style.fontSize = '12px';

        nodes.append(wordTranslations);

        console.log(words);
        if (words.publicSet === false) {
            let buttonRemove = document.createElement("button");
            buttonRemove.classList.add("transparency");
            buttonRemove.textContent = "remove";
            buttonRemove.style.backgroundColor = 'rgba(255,46,46,0.3)';
            buttonRemove.addEventListener('click', async () => {

                console.log([it]);

                let response = await fetch(backendUrl + '/translationLists/removeTranslation/' + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify([it])
                });

                let user = await response.json();
                console.log(user);
                document.location = './words.html?idList=' + id;
            });

            let buttonEdit = document.createElement('button');
            buttonEdit.classList.add("transparency");
            buttonEdit.textContent = "Edit";
            buttonEdit.style.backgroundColor = 'rgba(141,141,141,0.3)';

            buttonEdit.classList.add('edit-button');

            buttonEdit.addEventListener('click', async () => {

                document.location = './add_word.html?idList=' + id + '&wordId=' + it.id;
            })

            buttonRemove.classList.add('remove-button')

            word.append(buttonEdit);
            word.append(buttonRemove);
        }

        document.querySelector("body .content").append(word);
    });


    console.log(words.publicSet);
    if (words.publicSet === false) {
        document.getElementById('content__add-word').style.display = 'block';
    }
})();
