const socket = io();

const formUser= document.querySelector('#formUser');
const inputUser = document.querySelector('#inputUser');
const messages = document.querySelector('#messages');
const formMessage = document.querySelector('#formMessage');
const inputMessage = document.querySelector('#inputMessage');
const userContainer = document.querySelector('#userContainer');
const diceBtn = document.querySelector('#diceBtn')

let myUser;

formUser.addEventListener('submit', function(e) {
    e.preventDefault();
    myUser = inputUser.value;
    userContainer.innerHTML = '<h2>Välkommen ' + myUser + '</h2>';
    document.getElementById('user').style.display = 'none';
    document.getElementById('message').style.display = 'block';
});

formMessage.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log()
    if (inputMessage.value) {
        socket.emit('chatMessage', {user: myUser, message: inputMessage.value});
        inputMessage.value = '';
    }
});
let totalNumbers = []

diceBtn.addEventListener('click', (e) => {
    let numberGenerator = Math.floor(Math.random()*10+1)
    totalNumbers.push(numberGenerator)
    let sum = totalNumbers.reduce((a, b) => { return a + b})
    socket.emit('roll', {user: myUser, roll: numberGenerator, totalRolls: sum});
    console.log(numberGenerator, sum)

})

socket.on('newChatMessage', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
});


socket.on('newRoll', function(roll) {
    let item = document.createElement('li');
    item.textContent = roll;
    messages.appendChild(item);
});
