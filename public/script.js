const getid = (id) => document.getElementById(id) || null;
const socket = io('http://localhost:3001/chat');
const chatbox = getid('chatbox');
const form = getid('chat_form');
const submit = getid('submit');
const exit = getid('exitRoom');
const text = getid('text');
const enter = getid('enterRoom');
let name;

function hello() {
  const username = prompt('hi');
  name = username;
  console.log(username);
  let data = {
    hjhi: 'Ss',
    dd: username,
  };
  socket.emit('new_user', data);
  console.log('메세지보냄?');
  socket.on('hello_user', (data) => {
    console.log(data.dd + ' 하위영');
    console.log('---');
    console.log('메세지받음');
  });

  socket.on('msgToClient', (data) => {
    console.log(data.username + '메세지 내용 : ' + data.message);
    console.log('메세지받음');
  });
  socket.on('enterRoom', (data) => {
    console.log('방입장');
  });
  socket.on('exitRoome', (data) => {
    console.log('방입장');
  });
}

submit.addEventListener('click', function () {
  console.log(text.value);
  let data = {
    username: '8000',
    message: text.value,
  };
  socket.emit('msgToServer', data);
});
enter.addEventListener('click', function () {
  let data = {
    username: '9000',
    text: text.value,
    roomid: 'hihi',
  };
  socket.emit('enterRoom', data);
});
exit.addEventListener('click', function () {
  let data = {
    username: '9000',
    text: text.value,
  };
  socket.emit('exitRoom', data);
});
function init() {
  hello();
}

init();
