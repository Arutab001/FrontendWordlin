(async () => {

    let response = await fetch(backendUrl + '/translationLists/allPublic', {
        method: 'GET',
    });


    let words = await response.json();
    console.log(words);

    for (const it of words) {
        let word = document.createElement("div");
        word.classList.add("word-block");

        let nodes = document.createElement("div");
        nodes.classList.add("word");
        nodes.classList.add("transparency");

        let response1 = await fetch(backendUrl + '/user/existTranslationSet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(it)
        });

        nodes.addEventListener("click", () => {
            window.location = "./words.html?idList=" + it.id;
        });

        nodes.textContent = it.publicName;
        word.append(nodes);

        let text = await response1.text();

        if (text !== 'true') {
            let button = document.createElement("button");
            button.classList.add("add-list");
            button.classList.add("transparency");
            button.textContent = "add";
            button.style.backgroundColor = 'rgba(46,255,112,0.3)';
            button.addEventListener('click', async () => {

                console.log([it]);

                let response = await fetch(backendUrl + '/translationLists/addTranslationSet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify([it])
                });

                let user = await response.json();
                console.log(user);
                document.location.reload();
            });

            word.append(button);
        } else {
            let button = document.createElement("button");
            button.classList.add("add-list");
            button.classList.add("transparency");
            button.textContent = "remove";
            button.style.backgroundColor = 'rgba(255,46,46,0.3)';
            button.addEventListener('click', async () => {

                console.log([it]);

                let response = await fetch(backendUrl + '/translationLists/removeTranslationSet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify([it])
                });

                let user = await response.json();
                console.log(user);
                document.location.reload();
            });
            word.append(button);

        }


        document.querySelector("body .content").append(word);
    }

})();
