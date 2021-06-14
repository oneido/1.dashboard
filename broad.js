const broad = {

    receiveMessage: (message) => {
            if(message.origin=="https://oneido.github.io"){
        NewWindow.postMessage(JSON.stringify(obj), "https://oneido.github.io");
            }
    }

}


window.addEventListener("message", broad.receiveMessage, false);
