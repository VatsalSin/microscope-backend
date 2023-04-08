STATE = {
	'NOT_VISITED': 0,
	'VISITED': 1,
	'FOCUSING': 2,
	'FOCUSED': 3,
	'CAPTURING': 4, 
	'CAPTURED': 5,	
};

EVENT = {
	'REGISTER_CLIENT': 'client-register',
	'GET_SLIDE_STATE': 'get-slide-state',
	'UPDATE_SLIDE': 'update-slide',
	'SLIDE_STATE_SYNC': 'slide-state-sync',
	'CLIENT_REGISTERED_ACK': 'client-registered-ack'
};

MAX_MACHINES = 100;

PORT = 4000;

module.exports = {STATE, EVENT, MAX_MACHINES, PORT};