var socket = io();
var label = $("#lblNuevoTicket");

socket.on("connect", function() {
  console.log("Usuario conectado");
});

socket.on("disconnect", function() {
  console.log("Usuario descoenctado");
});

socket.on("estadoActual", function(resp) {
  label.text(resp.actual);
});

$("button").on("click", function() {
  socket.emit("siguienteTicket", null, function(siguienteTicket) {
    label.text(siguienteTicket);
  });
});
