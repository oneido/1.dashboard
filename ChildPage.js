function receiveMessage(message) {
    if (message.origin == "null") {

        console.log(JSON.parse(message.data));
        [name, ...list] = JSON.parse(message.data);
        document.querySelector(".UserName").innerText = name;
        for (let i = 0; i < list.length; i++) {

            List = document.createElement("li");
            List.innerText = list[i];
            document.querySelector(".ListBoard").appendChild(List);
        }

    }
}

window.addEventListener("load", () => {

    window.opener.postMessage("데이터를 내 놓거라", "*");

});

window.addEventListener("message", receiveMessage, false);