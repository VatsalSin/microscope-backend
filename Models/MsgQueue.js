module.exports =  class MsgQueue {
	
	constructor() {
		this.items = [];
		this.front = 0;
		this.back = 0;
	}

	push(x) {
		this.items.push(x);
		this.back++;
	}

	pop() {
		this.front = Math.min(this.front+1, this.back);

		// Can consider deleting elements to make sure the 
		// items don't get very large in original instance 
	}
	
	head() {
		return this.items[this.front];
	}
	
	size() {
		return this.back - this.front
	}

	getItems() {
		return this.items.slice(this.front)
	}

};
