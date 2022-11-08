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

    for (const item of words) {
        let word = document.createElement("div");
        word.classList.add("word-block");


        let nodes = document.createElement("div");
        nodes.classList.add("word");
        nodes.classList.add("word");
        nodes.classList.add("transparency");
        nodes.addEventListener("click", () => {
            window.location = "./words.html?idList=" + item.id;
        });

        nodes.textContent = item.publicName;
        if (item.publicSet === true) {
            let spat = document.createElement('span');
            spat.textContent = ' (public)';
            spat.style.color = '#7c7c7c'
            spat.style.fontSize = '12px'

            nodes.append(spat);

        }

        let button = document.createElement("button");
        button.classList.add("add-list");
        button.classList.add("transparency");
        button.textContent = "remove";
        button.style.backgroundColor = 'rgba(255,46,46,0.3)';
        button.addEventListener('click', async () => {

            let response = await fetch(backendUrl + '/translationLists/removeTranslationSet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify([item])
            });

            let user = await response.json();
            console.log(user);
            document.location.reload();
        });

        word.append(nodes);
        word.append(button);


        console.log(item)
        document.querySelector("body .content").append(word);
    }
})();