const broad = {

    receiveMessage: (message) => {

        NewWindow.postMessage(JSON.stringify(obj), "https://oneido.github.io");

    }

}


window.addEventListener("message", broad.receiveMessage, false);
