const {STATE} = require("../Config");

module.exports =  class EventLoop {

	async start(slide, machine, msgQueue) {
		return new Promise(async (resolve, reject) => {
			try {
				
				while(1) {
					var [newX, newY] = slide.process(msgQueue);

					if(msgQueue.size()) {
						continue;
					} else {
						slide.setCellState(newX, newY, STATE.FOCUSING);
						await machine.focus(newX,newY);
						slide.setCellState(newX, newY, STATE.FOCUSED);
					}

					if(msgQueue.size()) {
						continue;
					} else {
						slide.setCellState(newX, newY, STATE.CAPTURING);
						await machine.capture(newX,newY);
						slide.setCellState(newX, newY, STATE.CAPTURED);
					}
					
					if(msgQueue.size()) {
						continue;
					} else {
						break;
					}
				}

				resolve(`Captured (${newX}, ${newY}) successfully`);

			} catch(err) {
				reject(err)
			};
		})
	}


		

};
