const MsgQueue = require('./MsgQueue');
const Slide = require('./Slide');
const EventLoop = require('./EventLoop');
const {EVENT} = require("../Config");


module.exports =  class Client {
	
	constructor(clientId, slideNumsRows, slideNumCols, machinePool, clientEventEmitter) {
		this.clientId = clientId;
		this.slide = new Slide(slideNumsRows, slideNumCols, this);
		this.msgQueue = new MsgQueue();
		this.machine = machinePool.getMachine(clientId);
		this.eventLoop = null;
		this.clientEventEmitter = clientEventEmitter;
	}

	processRequest(op) {

		try {
			this.msgQueue.push(op);
			if(!this.eventLoop) {
				this.eventLoop = new EventLoop();

				this.eventLoop.start(this.slide, this.machine, this.msgQueue).then(
					(successMsg) => {
						console.log(successMsg);
						this.eventLoop = null;
					},
					(error) => {
						console.log(error);
						throw(error);
					}
				);
			}

			return true;
		} catch(err) {
			throw(err);
		}
	}

	sendClientSlideUpdates() {
		this.clientEventEmitter.to(this.clientId).emit(EVENT.SLIDE_STATE_SYNC, {
			slide: this.slide.getCurrentState(),
			queue: this.msgQueue.getItems()
		})

		console.log(`Client update sent for client ${this.clientId}`);
	};

	sendRegisterationAck() {
		this.clientEventEmitter.to(this.clientId).emit(EVENT.CLIENT_REGISTERED_ACK, {});
		console.log(`Client register ack sent for client ${this.clientId}`);
	}
};
