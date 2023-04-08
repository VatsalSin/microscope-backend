const Machine = require('./Machine');

module.exports =  class MachinePool {

	machineMap = {};

	constructor(maxMachines) {
		this.maxMachines = maxMachines;

		this.allocateMachines = [];
		this.unAllocatedMachines = [];

		for(let i = 0; i<maxMachines; i++) {
			this.unAllocatedMachines.push(i);
			this.machineMap[i] = new Machine(i);			
		}
	}

	getMachine(clientId) {
		if(this.unAllocatedMachines.length > 0) {
			
			let newMachineId = this.unAllocatedMachines.pop();
			this.allocateMachines.push(newMachineId);

			console.log(`Machine ${newMachineId} allocated to client ${clientId}`);

			return this.machineMap[newMachineId];
		} else {
			console.log(`Machine allocation failed.All machines are busy.`);
			return null;
		}
	}

	releaseMachine(machineId) {
		this.allocateMachines = this.allocateMachines.filter(id => id !== machineId);
		this.unAllocatedMachines.push(machineId);
	}	
};
