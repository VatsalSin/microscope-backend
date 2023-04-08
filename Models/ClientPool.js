module.exports =  class ClientPool {
	
	constructor() {
		this.clients = {};
	}

	addClient(client) {
		if(!this.exists(client.clientId)) {
			this.clients[ client.clientId ] = client;
			console.log(`Client with client id ${client.clientId} registered`);
			client.sendRegisterationAck();
			return true;
		} else {
			false;
		}

	}

	removeClient(clientId) {
		delete this.clients[clientId];
	}

	exists(clientId) {
		return (clientId in this.clients);
	}
};
