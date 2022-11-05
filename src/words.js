(async () => {

    let id = new URLSearchParams(location.search).get(idList);
    if (id === null) {
        window.location="./word_lists.html"
    }

    let response = await fetch(backendUrl + '/translationLists/' + id, {
        method: 'GET',
    });

    let words = await response.json();
    console.log(words);

    for (let i = 0; i < words.translations.length; i++) {
        let word = document.createElement("div");

        word.classList.add("word");
        word.addEventListener("click", () => {
            window.location = "./word_lists.html?idList=" + words[i].id;
        });

        let nodes = document.createElement("span");
        nodes.textContent = words.translations[i].word.word;
        word.append(nodes);

        document.querySelector("body .content .word-lists").append(word);
    }
})();