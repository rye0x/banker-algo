<script lang="ts">
	import { BankerAlgorithm } from '$lib/banker/banker';
	import { runAllTests } from '$lib/banker/banker.test';

	let allocation = [
		[0, 1, 0],
		[2, 0, 0],
		[3, 0, 2],
		[2, 1, 1],
		[0, 0, 2]
	];

	let max = [
		[7, 5, 3],
		[3, 2, 2],
		[9, 0, 2],
		[2, 2, 2],
		[4, 3, 3]
	];

	let available = [3, 3, 2];
	let result: any = null;

	function runAlgorithm() {
		result = BankerAlgorithm(allocation, max, available);
	}

	function runTests() {
		console.clear();
		runAllTests();
	}

	function loadExample(exampleNum: number) {
		switch (exampleNum) {
			case 1: // Safe example
				allocation = [
					[0, 1, 0],
					[2, 0, 0],
					[3, 0, 2],
					[2, 1, 1],
					[0, 0, 2]
				];
				max = [
					[7, 5, 3],
					[3, 2, 2],
					[9, 0, 2],
					[2, 2, 2],
					[4, 3, 3]
				];
				available = [3, 3, 2];
				break;
			case 2: // Unsafe example
				allocation = [
					[0, 1, 0],
					[2, 0, 0],
					[3, 0, 2],
					[2, 1, 1],
					[0, 0, 2]
				];
				max = [
					[7, 5, 3],
					[3, 2, 2],
					[9, 0, 2],
					[2, 2, 2],
					[4, 3, 3]
				];
				available = [1, 0, 0];
				break;
		}
		result = null;
	}
</script>

<svelte:head>
	<title>Banker's Algorithm Demo</title>
</svelte:head>

<div class="container">
	<h1>🏦 Banker's Algorithm Simulator</h1>

	<div class="examples">
		<button on:click={() => loadExample(1)} class="btn btn-primary"> Load Safe Example </button>
		<button on:click={() => loadExample(2)} class="btn btn-secondary"> Load Unsafe Example </button>
		<button on:click={runTests} class="btn btn-accent"> Run All Tests (Check Console) </button>
	</div>

	<div class="matrices">
		<div class="matrix-section">
			<h3>Allocation Matrix</h3>
			<div class="matrix">
				{#each allocation as row, i}
					<div class="matrix-row">
						<span class="process-label">P{i}:</span>
						{#each row as cell, j}
							<input bind:value={allocation[i][j]} type="number" min="0" />
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<div class="matrix-section">
			<h3>Max Matrix</h3>
			<div class="matrix">
				{#each max as row, i}
					<div class="matrix-row">
						<span class="process-label">P{i}:</span>
						{#each row as cell, j}
							<input bind:value={max[i][j]} type="number" min="0" />
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<div class="matrix-section">
			<h3>Available Resources</h3>
			<div class="matrix-row">
				{#each available as resource, i}
					<input bind:value={available[i]} type="number" min="0" />
				{/each}
			</div>
		</div>
	</div>

	<button on:click={runAlgorithm} class="btn btn-large btn-primary">
		🚀 Run Banker's Algorithm
	</button>

	{#if result}
		<div class="result {result.isSafe ? 'safe' : 'unsafe'}">
			<h3>{result.isSafe ? '✅ System is SAFE' : '❌ System is UNSAFE'}</h3>

			{#if result.isSafe}
				<p><strong>Safe Sequence:</strong> P{result.sequence.join(' → P')}</p>
			{:else}
				<p><strong>Deadlock detected!</strong></p>
				<p><strong>Partial Sequence:</strong> P{result.sequence.join(' → P')} → ?</p>
			{/if}

			<details>
				<summary>Available Resources Timeline</summary>
				<div class="timeline">
					{#each result.availableSequence as available, i}
						<div class="timeline-item">
							<strong>Step {i}:</strong> [{available.join(', ')}]
							{#if i > 0}
								<span class="process-executed">After P{result.sequence[i - 1]} completes</span>
							{:else}
								<span class="process-executed">Initial state</span>
							{/if}
						</div>
					{/each}
				</div>
			</details>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	h1 {
		text-align: center;
		color: #2563eb;
		margin-bottom: 2rem;
	}

	.examples {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #2563eb;
		color: white;
	}

	.btn-secondary {
		background: #6b7280;
		color: white;
	}

	.btn-accent {
		background: #7c3aed;
		color: white;
	}

	.btn-large {
		font-size: 1.1rem;
		padding: 1rem 2rem;
		display: block;
		margin: 2rem auto;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.matrices {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.matrix-section:last-child {
		grid-column: 1 / -1;
		justify-self: center;
	}

	.matrix-section h3 {
		color: #374151;
		margin-bottom: 1rem;
		text-align: center;
	}

	.matrix {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		border: 2px solid #e5e7eb;
	}

	.matrix-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.process-label {
		font-weight: 600;
		min-width: 2rem;
		color: #374151;
	}

	input {
		width: 3rem;
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.25rem;
		text-align: center;
	}

	input:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
	}

	.result {
		margin-top: 2rem;
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid;
	}

	.result.safe {
		background: #ecfdf5;
		border-color: #10b981;
	}

	.result.unsafe {
		background: #fef2f2;
		border-color: #ef4444;
	}

	.result h3 {
		margin: 0 0 1rem 0;
	}

	.timeline {
		margin-top: 1rem;
	}

	.timeline-item {
		padding: 0.5rem;
		background: white;
		border-radius: 0.25rem;
		margin-bottom: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.process-executed {
		color: #6b7280;
		font-size: 0.9rem;
		margin-left: 1rem;
	}

	details {
		margin-top: 1rem;
	}

	summary {
		cursor: pointer;
		font-weight: 600;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 0.25rem;
	}

	@media (max-width: 768px) {
		.matrices {
			grid-template-columns: 1fr;
		}

		.examples {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
