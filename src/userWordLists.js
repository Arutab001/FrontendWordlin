(async () => {

    let response = await fetch(backendUrl + '/translationLists/userTranslationSet', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    });

    let words = await response.json();
    console.log(words);

    for (let i = 0; i < words.length; i++) {
        let word = document.createElement("div");

        word.classList.add("word");
        word.addEventListener("click", () => {
            window.location = "./words.html?idList=" + words[i].id;
        });

        let nodes = document.createElement("span");
        nodes.textContent = words[i].publicName;
        word.append(nodes);

        document.querySelector("body .content").append(word);
    }
})();