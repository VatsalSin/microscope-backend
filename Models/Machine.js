module.exports =  class Machine {
	
	constructor(id) {
		this.id = id;
		this.state = 'Idle';
	}

	async focus(x, y) {
		this.state = 'Focusing';
		await this.sleep(3000);
		this.state = 'Idle';
	}

	async capture(x, y) {
		this.state = 'Capturing';
		await this.sleep(2000);
		this.state = 'Idle';
	}

	async sleep(milliseconds) {
		return new Promise(resolve => setTimeout(resolve, milliseconds));  
	}

	getState() {
		return this.state;
	}
};
