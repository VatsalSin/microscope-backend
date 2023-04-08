var queue = [];
var state = {
	idle: 1,
	lastIdx: 0,
	x: 0,
	y: 0
	slide: []
};


init = () => {
	rows = 20;
	cols = 60;

	for(let i=0; i<rows; i++) {
		state.slide.push([]);
		for(let j=0; j<cols; j++)
		{
			state.slide[i].push(0);
		}
	}
}

enqueue = (op) => {
	queue.push(q);

	if(state.idle)
		eventLoop();
}

processQueue = () => {
	while( len(queue) > lastIdx + 1 )
	{
		state.idle = 0;

		let idx = state.lastIdx + 1;
		let x = state.x;
		let y = state.y;

		if( queue[idx] == 'U' )
			x = max(x-1,0)
		else if( queue[idx] == 'D' )
			x = min(x+1, 20)
		else if( queue[idx] == 'R' )
			y = min(y+1, 60)
		else if( queue[idx] == 'L' )
			y = max(y-1, 0)

		if(state.slide[x][y] == 0)
			state.slide[x][y] = 1;

		state.x = x;
		state.y = y; 
	}
}

eventLoop = () => {

	state.idle = 0;

	while(!state.idle)
	{
		processQueue();

		let x = state.x;
		let y = state.y;

		state.slide[x][y] = 2;
		focus(x,y);
		state.slide[x][y] = 4;

		processQueue();
		
		if(x != state.x || y != state.y)
			continue;
		else {
			state.slide[x][y] = 3;
			capture(x,y);
			state.slide[x][y] = 5;
		}

		processQueue();

		if(x != state.x || y != state.y)
			continue;
		else
			state.idle = 1;
	}
}
