const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const {registerClient, sendSlideStateToClient, updateClientSlide} = require('./Controllers/ClientRequestController')
const { EVENT, PORT } = require('./Config')


io.on('connection', (socket) => {
	console.log(`New incoming connection detected.`);

	socket.on(EVENT.REGISTER_CLIENT, (data) => {
		registerClient(data, socket, io);
	});

	socket.on(EVENT.GET_SLIDE_STATE, (data) => {
		sendSlideStateToClient(data);
	});

	socket.on(EVENT.UPDATE_SLIDE, (data) => {
		updateClientSlide(data);
	})

});


server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));