
const socket = io('http://localhost:5000', {
    transports: ['websocket']  // Only use WebSocket
  });
  

socket.on('connect', () => {
    console.log('Connected to server');
});

  

const form=document.getElementById('message_sender')
const messageinput=document.getElementById('message')
const messagecontainer=document.querySelector('.container')

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value=""
})


const name=prompt("Enter your name to join the chat:");
socket.emit("new-user-joined",name);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
    })
 
socket.on('left',name=>{
    append(`${data.name} left the chat`,'left' );
    })