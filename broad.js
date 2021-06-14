const broad = {

    receiveMessage: (message) => {

        NewWindow.postMessage(JSON.stringify(obj), "*");

    }

}


window.addEventListener("message", broad.receiveMessage, false);