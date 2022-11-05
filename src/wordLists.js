(async () => {

    let response = await fetch(backendUrl + '/translationLists/allPublic', {
        method: 'GET',
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
        let button = document.createElement("button");
        button.classList.add("add-list");
        button.textContent = "add";
        word.append(nodes);

        document.querySelector("body .content .word-lists").append(word);
        document.querySelector("body .content .word-lists").append(button);

    }
})();