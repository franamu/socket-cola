const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", client => {
  console.log("Usuario conectado");

  client.emit("enviarMensaje", {
    usuario: "Administrador",
    mensaje: "Bienvenido a esta aplicación"
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
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

    client.broadcast.emit("ultimos4", {
      ultimos4: ticketControl.getUltimos4()
    });
  });
});
