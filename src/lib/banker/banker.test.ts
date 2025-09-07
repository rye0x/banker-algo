import { BankerAlgorithm } from './banker';

// Test Case 1: Safe state - classic example
function testSafeState() {
	console.log('\n=== TEST 1: SAFE STATE ===');

	const allocation = [
		[0, 1, 0], // P0
		[2, 0, 0], // P1
		[3, 0, 2], // P2
		[2, 1, 1], // P3
		[0, 0, 2] // P4
	];

	const max = [
		[7, 5, 3], // P0
		[3, 2, 2], // P1
		[9, 0, 2], // P2
		[2, 2, 2], // P3
		[4, 3, 3] // P4
	];

	const available = [3, 3, 2];

	const result = BankerAlgorithm(allocation, max, available);
	console.log('Result:', result);
	return result.isSafe;
}

// Test Case 2: Unsafe state - deadlock scenario
function testUnsafeState() {
	console.log('\n=== TEST 2: UNSAFE STATE ===');

	const allocation = [
		[0, 1, 0], // P0
		[2, 0, 0], // P1
		[3, 0, 2], // P2
		[2, 1, 1], // P3
		[0, 0, 2] // P4
	];

	const max = [
		[7, 5, 3], // P0
		[3, 2, 2], // P1
		[9, 0, 2], // P2
		[2, 2, 2], // P3
		[4, 3, 3] // P4
	];

	const available = [1, 0, 0]; // Not enough resources

	const result = BankerAlgorithm(allocation, max, available);
	console.log('Result:', result);
	return !result.isSafe;
}

// Test Case 3: Single process
function testSingleProcess() {
	console.log('\n=== TEST 3: SINGLE PROCESS ===');

	const allocation = [[1, 2, 1]];
	const max = [[3, 4, 2]];
	const available = [2, 2, 1];

	const result = BankerAlgorithm(allocation, max, available);
	console.log('Result:', result);
	return result.isSafe && result.sequence.length === 1;
}

// Test Case 4: All processes already completed
function testAllCompleted() {
	console.log('\n=== TEST 4: ALL PROCESSES COMPLETED ===');

	const allocation = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	const max = [
		[3, 2, 1],
		[2, 1, 3],
		[1, 3, 2]
	];

	const available = [6, 6, 6];

	const result = BankerAlgorithm(allocation, max, available);
	console.log('Result:', result);
	return result.isSafe;
}

// Test Case 5: Real-world scenario
function testRealWorldScenario() {
	console.log('\n=== TEST 5: REAL WORLD SCENARIO ===');

	const allocation = [
		[2, 0, 1, 1], // P0: Printer, Scanner, Network, Memory
		[0, 1, 2, 1], // P1
		[1, 1, 0, 2], // P2
		[1, 0, 0, 0], // P3
		[0, 2, 1, 0] // P4
	];

	const max = [
		[4, 2, 1, 2], // P0
		[2, 3, 4, 2], // P1
		[3, 2, 1, 4], // P2
		[2, 1, 2, 1], // P3
		[1, 3, 3, 2] // P4
	];

	const available = [3, 1, 4, 2];

	const result = BankerAlgorithm(allocation, max, available);
	console.log('Result:', result);
	return result.isSafe;
}

// Run all tests
function runAllTests() {
	console.log("🚀 Running Banker's Algorithm Tests...\n");

	const tests = [
		{ name: 'Safe State', fn: testSafeState },
		{ name: 'Unsafe State', fn: testUnsafeState },
		{ name: 'Single Process', fn: testSingleProcess },
		{ name: 'All Completed', fn: testAllCompleted },
		{ name: 'Real World', fn: testRealWorldScenario }
	];

	let passed = 0;
	let total = tests.length;

	tests.forEach((test) => {
		try {
			const result = test.fn();
			if (result) {
				console.log(`✅ ${test.name}: PASSED`);
				passed++;
			} else {
				console.log(`❌ ${test.name}: FAILED`);
			}
		} catch (error) {
			console.log(`❌ ${test.name}: ERROR - ${error}`);
		}
	});

	console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
	return passed === total;
}

// Export for external use
export { runAllTests, testSafeState, testUnsafeState };

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
	runAllTests();
}
