const ClientPool = require('../Models/ClientPool');
const MachinePool = require('../Models/MachinePool');
const Client = require('../Models/Client');
const {MAX_MACHINES} = require("../Config");


var clientPool = new ClientPool();
var machinePool = new MachinePool(MAX_MACHINES);

const registerClient = (data, socket, io) => {
	let clientId = data.clientId;
	
	let clientEventEmitter = io;
	socket.join(clientId); // Client Id is used as channel id for socket

	if(!clientPool.exists(clientId)) {		
		let client = new Client(clientId, data.slideNumRows, data.slideNumCols, machinePool, clientEventEmitter);
		clientPool.addClient(client);
	} else {
		clientPool.clients[clientId].sendRegisterationAck();
		console.log(`Client with client id ${clientId} already exists, skipping connection request`);
	}
};

const sendSlideStateToClient = (data) => {
	clientPool.clients[data.clientId].sendClientSlideUpdates();
};

const updateClientSlide = (data) => {
	clientPool.clients[data.clientId].processRequest(data.operation);
};

module.exports ={
	registerClient, 
	sendSlideStateToClient,
	updateClientSlide
};