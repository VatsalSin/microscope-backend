const {STATE} = require("../Config");

module.exports =  class Slide {
	
	stateMap = Object.keys(STATE);

	constructor(rows, cols, client) {
		this.rows = rows;
		this.cols = cols;
		this.client = client;
		this.currX = 0;
		this.currY = 0;
		this.state = [];

		for(let i=0; i<rows; i++) {
			
			this.state.push([]);
			
			for(let j=0; j<cols; j++)
			{
				this.state[i].push(0);
			}
		}
	}

	setCellState(rowIdx, colIdx, newState) {
		
		let oldState = this.state[rowIdx][colIdx];

		// A cell can only get to higher state
		// but a already focused cell can go to focusing state again
		if(oldState < newState || (newState == STATE.FOCUSING && oldState == STATE.FOCUSED)) {
			this.state[rowIdx][colIdx] = newState;
			console.log(`State for cell [${rowIdx}, ${colIdx}] changed: ${this.stateMap[oldState]} -> ${this.stateMap[newState]}`);
			
			if(newState != STATE.VISITED)
				this.client.sendClientSlideUpdates();

			return true;
		} else {
			console.log(`Invalid state trasition for cell [${rowIdx}, ${colIdx}]: ${oldState} -> ${newState}`);
			return false;
		}

	}

	getCurrentState() {
		return {
			'x': this.currX,
			'y': this.currY,
			'stateMap': this.stateMap,
			'slide': this.state 
		}
	}

	process(msgQueue) {
		let newX = this.currX;
		let newY = this.currY;


		while(msgQueue.size())
		{
			let op = msgQueue.head();
			switch(op) {
			  case 'U':
			    newX = Math.max(newX-1, 0);
			    break;
			  case 'D':
			    newX = Math.min(newX+1, this.rows-1);
			    break;
			  case 'R':
			    newY = Math.min(newY+1, this.cols-1);
			    break;
			  case 'L':
			    newY = Math.max(newY-1, 0);
			    break;
			  default:
			    console.log('Invalid Operation Request. Skipping...')
			}

			if(this.state[newX][newY] == STATE.NOT_VISITED)
				this.setCellState(newX, newY, STATE.VISITED);
			msgQueue.pop();	
		}

		// isPointShifted = (this.currX != newX || this.currY != newY)
		console.log(`Point shifted: (${this.currX}, ${this.currY}) -> (${newX}, ${newY})`);
		this.currX = newX;
		this.currY = newY;
		
		return [newX, newY];
	}
};
