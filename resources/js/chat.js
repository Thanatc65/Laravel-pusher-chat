import axios from "axios";

const messageElement = document.getElementById('messageOutput');
const userMessageInput = document.getElementById('message');
const sendMessageForm = document.getElementById('chatForm');

let url = window.location;
let urlNew = new URL(url);
let userName = urlNew.searchParams.get('name');

sendMessageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (userMessageInput.value != '') {
        axios({
            method: 'POST',
            url: '/sendMessage',
            data: {
                username: userName,
                message: userMessageInput.value
            }
        })
    }
    window.Echo.channel('laravelChat')
    .listen('.chatting', (res) => {
        messageElement.innerHTML += '<div class="username">' + res.username + ': ' + res.message + '</div><br>';
    });


    userMessageInput.value = '';
})
