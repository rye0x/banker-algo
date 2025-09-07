// Implementation of Banker's Algorithm
// Input: Allocation matrix, Max matrix, Available vector

const getNeedMatrix = (allocation: number[][], max: number[][]) => {
	const need: number[][] = [];
	for (let i = 0; i < allocation.length; i++) {
		need.push([]);
		for (let j = 0; j < allocation[i].length; j++) {
			need[i].push(max[i][j] - allocation[i][j]);
		}
	}
	return need;
};

const getNewAvailable = (allocation: number[], available: number[]): number[] => {
	return allocation.map((alloc, i) => available[i] + alloc);
};

export function BankerAlgorithm(allocation: number[][], max: number[][], available: number[]) {
	console.log('Allocation matrix:');
	console.table(allocation);

	console.log('Max matrix:');
	console.table(max);

	// Calculate need matrix
	const need = getNeedMatrix(allocation, max);

	console.log('Need Matrix:');
	console.table(need);

	// Initialize sequence and available tracking
	const sequence: number[] = [];
	const availableSequence: number[][] = [available.slice()]; // Start with initial available
	const numProcesses = allocation.length;
	const finished = new Array(numProcesses).fill(false);

	console.log('Initial available:', available);

	// Find safe sequence
	let found = true;
	while (sequence.length < numProcesses && found) {
		found = false;

		for (let i = 0; i < numProcesses; i++) {
			if (finished[i]) continue;

			// Check if process i can be satisfied
			const currentAvailable = availableSequence[availableSequence.length - 1];
			const canExecute = need[i].every((needed, j) => needed <= currentAvailable[j]);

			if (canExecute) {
				// Execute process i
				sequence.push(i);
				finished[i] = true;

				// Release resources (add allocation back to available)
				const newAvailable = getNewAvailable(allocation[i], currentAvailable);
				availableSequence.push(newAvailable);

				found = true;
				break;
			}
		}
	}

	// Check if safe sequence found
	if (sequence.length === numProcesses) {
		console.log('The system is SAFE');
		console.log('Safe sequence: P' + sequence.join(' -> P'));
		console.log('Available sequence:', availableSequence);
		return {
			availableSequence,
			sequence,
			status: 0, // Safe
			isSafe: true
		};
	} else {
		console.log('The system is NOT SAFE');
		console.log('Deadlock detected');
		console.log('Partial sequence: P' + sequence.join(' -> P') + ' -> ?');
		return {
			availableSequence,
			sequence,
			status: 1, // Unsafe
			isSafe: false
		};
	}
}
