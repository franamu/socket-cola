const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();
console.log(ticketControl);

io.on("connection", client => {
  console.log("Usuario conectado");

  client.emit("enviarMensaje", {
    usuario: "Administrador",
    mensaje: "Bienvenido a esta aplicación"
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket()
  });

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Escuchar el cliente
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();
    callback(siguiente);
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es necesario"
      });
    }

    let antenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(antenderTicket);
  });
});
