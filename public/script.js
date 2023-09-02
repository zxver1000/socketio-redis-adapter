const getid = (id) => document.getElementById(id) || null;
const socket = io('http://localhost:3001/chat');
const chatbox = getid('chatbox');
const form = getid('chat_form');
const submit = getid('submit');
const exit = getid('exitRoom');
const text = getid('text');
const enter = getid('enterRoom');
const textbox = getid('textbox');
let name;

function init() {
  socket.on('msgToClient', (data) => {
    console.log(data.username + '메세지 내용 : ' + data.message);

    console.log('메세지받음');
    textbox.innerHTML +=
      '<p> Port:' + data.username + ' : ' + data.message + '</p>';
  });
  socket.on('enterRoom', (data) => {
    console.log('방입장');
    textbox.innerHTML +=
      '<p>' + data.username + '님이 방에 입장하셨습니다' + '</p>';
  });
  socket.on('exitRoom', (data) => {
    console.log('방입장');
    textbox.innerHTML += '<p>' + data.username + '님이 퇴장하셨습니다' + '</p>';
  });
}

submit.addEventListener('click', function () {
  console.log(text.value);
  let data = {
    username: '3001',
    message: text.value,
  };
  socket.emit('msgToServer', data);
});
enter.addEventListener('click', function () {
  let data = {
    username: '3001',
    roomid: 'hihi',
  };
  socket.emit('enterRoom', data);
});
exit.addEventListener('click', function () {
  let data = {
    username: '3001',
    text: text.value,
  };
  socket.emit('exitRoom', data);
});

init();
