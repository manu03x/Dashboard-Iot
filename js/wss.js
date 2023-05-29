const serverUrl = 'ws://64.227.111.58:8081';

// Crear una instancia de WebSocket
const socket = new WebSocket(serverUrl);

// Evento que se ejecuta cuando la conexión se establece correctamente
socket.onopen = function() {
  console.log('Conexión establecida');
};


// Manejar el evento onmessage (se ejecuta cuando se recibe un mensaje del servidor)
socket.onmessage = function(event) {
  const sensorsData = JSON.parse(event.data);
  // const jsonMessage = JSON.stringify(message)
  // const jsonData = JSON.parse(String.fromCharCode(...JSON.parse(jsonMessage).data))
  console.log(event)
  sensorData = new SensorData(sensorsData);
  // Realiza las acciones necesarias con el mensaje recibido desde el servidor
  manageSensorDataForGraphics()
  manageBulbs();
};


// Manejar el evento onclose (se ejecuta cuando la conexión se cierra)
socket.onclose = function(event) {
  console.log('Conexión cerrada');
};

// Manejar el evento onerror (se ejecuta cuando ocurre un error en la conexión)
socket.onerror = function(error) {
  console.error('Error en la conexión:', error);
};