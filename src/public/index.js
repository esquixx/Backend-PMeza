
console.log("Init my chat");

let socket;


document.addEventListener("DOMContentLoaded", function() {
    initIo();
})

const input = document.querySelector('#chatinput')

input.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        sendMessage(event.currentTarget.value);
    }
});

document.querySelector('#send').addEventListener('click', event => {
    sendMessage(input.value)
});

async function sendMessage(message) {
    const user = document.querySelector("#username").value
    if (message.trim().length > 0) {
        await fetch('/api/chats/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        socket.emit('message', { user, message })
        input.value = ''

        const box = document.querySelector('#chatbox');
        const newMessage = `<p><i>${user}</i>: ${message}</p>`
        box.innerHTML += newMessage
    }
}

function initIo() {
    socket = io();
    const user = document.querySelector("#username").value;

    fetch('/api/chats/messages')
        .then(response => response.json())
        .then(messages => {
            const box = document.querySelector('#chatbox')
            let html = ''
            messages.reverse().forEach(message => {
                html += `<p><i>${user}</i>: ${message.message}</p>`
            });
            box.innerHTML = html;
        })
        .catch(error => {
            console.error('Error al obtener mensajes del historial:', error)
        })

    socket.on('logs', messages => {
        const box = document.querySelector('#chatbox')
        let html = ''
        messages.reverse().forEach(message => {
            html += `<p><i>${user}</i>: ${message.message}</p>`
        })
       
        box.innerHTML = html
    })
}