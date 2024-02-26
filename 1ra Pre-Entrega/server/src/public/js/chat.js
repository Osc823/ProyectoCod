const socket = io();

const chatbox = document.querySelector("#chatbox");
let user;

Swal.fire({
  title: "Bienvenido",
  text: "Ingrese su nombre para continuar",
  input: "text",
  inputValidator: (value) => {
    return !value && "Necesitás identificarte";
  },
  allowOutsideClick: false,
}).then((value) => {
  user = value.value;
  socket.emit("inicio", user);
});

socket.on("message", (data) => {
  const log = document.querySelector("#messages");
  log.innerHTML += `<strong>${data.username}</strong>: ${data.messages} <br />`;
});

chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    socket.emit("message", {
      user,
      message: e.target.value,
    });
    chatbox.value = "";
  }
});

socket.on("connected", (data) => {
  if (user !== undefined) {
    Swal.fire({
      text: `Nuevo usuario conectado: ${data}`,
      toast: true,
      position: "top-right",
    });
  }
});
