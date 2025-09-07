<script lang="ts">
	import { BankerAlgorithm } from '$lib/banker/banker';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import * as Collapsible from '$lib/components/ui/collapsible';

	// Default 3x3 matrices
	let allocation = [
		[0, 1, 0],
		[2, 0, 0],
		[3, 0, 2]
	];

	let max = [
		[7, 5, 3],
		[3, 2, 2],
		[9, 0, 2]
	];

	let available = [3, 3, 2];
	let result: any = null;

	function runAlgorithm() {
		result = BankerAlgorithm(allocation, max, available);
	}

	function addRow() {
		const numResources = allocation[0].length;
		allocation = [...allocation, new Array(numResources).fill(0)];
		max = [...max, new Array(numResources).fill(0)];
		result = null;
	}

	function removeRow() {
		if (allocation.length > 1) {
			allocation = allocation.slice(0, -1);
			max = max.slice(0, -1);
			result = null;
		}
	}

	function addColumn() {
		allocation = allocation.map((row) => [...row, 0]);
		max = max.map((row) => [...row, 0]);
		available = [...available, 0];
		result = null;
	}

	function removeColumn() {
		if (allocation[0].length > 1) {
			allocation = allocation.map((row) => row.slice(0, -1));
			max = max.map((row) => row.slice(0, -1));
			available = available.slice(0, -1);
			result = null;
		}
	}

	function loadExample(exampleNum: number) {
		console.log('Loading example:', exampleNum);

		// Clear any previous results
		result = null;

		switch (exampleNum) {
			case 1: // Safe example (3x3) - Simple guaranteed safe
				allocation = [
					[1, 0, 1],
					[2, 1, 0],
					[0, 0, 1]
				];
				max = [
					[3, 1, 2],
					[4, 2, 1],
					[1, 1, 2]
				];
				available = [2, 1, 1];
				console.log('Set 3x3 safe example - allocation:', allocation);
				break;
			case 2: // Unsafe example (3x3)
				allocation = [
					[1, 0, 1],
					[2, 1, 0],
					[0, 0, 1]
				];
				max = [
					[3, 1, 2],
					[4, 2, 1],
					[1, 1, 2]
				];
				available = [0, 0, 0]; // Not enough resources
				console.log('Set 3x3 unsafe example - allocation:', allocation);
				break;
			case 3: // Large safe example (5x3)
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
				console.log('Set 5x3 large example - allocation:', allocation);
				break;
			case 4: // Complex 4x4 example
				allocation = [
					[1, 0, 2, 1],
					[2, 1, 0, 0],
					[0, 2, 1, 2],
					[1, 1, 0, 1]
				];
				max = [
					[3, 2, 4, 2],
					[4, 3, 2, 1],
					[2, 4, 3, 4],
					[3, 3, 2, 2]
				];
				available = [2, 1, 2, 1];
				console.log('Set 4x4 complex example - allocation:', allocation);
				break;
		}

		// Force Svelte reactivity by creating new array references
		allocation = allocation.map((row) => [...row]);
		max = max.map((row) => [...row]);
		available = [...available];

		console.log('Final allocation after reactivity update:', allocation);
		console.log('Final max after reactivity update:', max);
		console.log('Final available after reactivity update:', available);
	}
</script>

<svelte:head>
	<title>Banker's Algorithm Demo</title>
</svelte:head>

<div class="container mx-auto p-6 max-w-7xl">
	<div class="text-center mb-8">
		<h1 class="text-4xl font-bold text-primary mb-2">🏦 Banker's Algorithm Simulator</h1>
		<p class="text-muted-foreground">Interactive deadlock avoidance algorithm demonstration</p>
	</div>

	<!-- Bento Grid Layout -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
		<!-- Left Column: Controls -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Quick Examples -->
			<Card>
				<CardHeader>
					<CardTitle>Quick Examples</CardTitle>
					<CardDescription>Load predefined scenarios</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 gap-2">
						<Button onclick={() => loadExample(1)} variant="default" size="sm">3×3 Safe</Button>
						<Button onclick={() => loadExample(2)} variant="secondary" size="sm">3×3 Unsafe</Button>
						<Button onclick={() => loadExample(3)} variant="outline" size="sm">5×3 Large</Button>
						<Button onclick={() => loadExample(4)} variant="ghost" size="sm">4×4 Complex</Button>
					</div>
				</CardContent>
			</Card>

			<!-- Matrix Controls -->
			<Card>
				<CardHeader>
					<CardTitle>Matrix Controls</CardTitle>
					<CardDescription>Adjust dimensions</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-2 gap-2 mb-4">
						<Button onclick={addRow} variant="outline" size="sm">➕ Process</Button>
						<Button onclick={removeRow} variant="outline" size="sm">➖ Process</Button>
						<Button onclick={addColumn} variant="outline" size="sm">➕ Resource</Button>
						<Button onclick={removeColumn} variant="outline" size="sm">➖ Resource</Button>
					</div>
					<div class="text-center">
						<Badge variant="secondary" class="text-xs">
							{allocation.length} × {allocation[0].length}
						</Badge>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Right Column: Matrices -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Allocation & Max Matrices -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<!-- Allocation Matrix -->
				<Card>
					<CardHeader>
						<CardTitle class="text-lg">Allocation Matrix</CardTitle>
						<CardDescription>Current allocations</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							{#each allocation as row, i}
								<div class="flex items-center gap-2">
									<Label class="min-w-6 font-mono text-xs">P{i}:</Label>
									{#each row as cell, j}
										<Input
											bind:value={allocation[i][j]}
											type="number"
											min="0"
											class="w-12 h-8 text-center text-sm"
										/>
									{/each}
								</div>
							{/each}
						</div>
					</CardContent>
				</Card>

				<!-- Max Matrix -->
				<Card>
					<CardHeader>
						<CardTitle class="text-lg">Max Matrix</CardTitle>
						<CardDescription>Maximum requirements</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							{#each max as row, i}
								<div class="flex items-center gap-2">
									<Label class="min-w-6 font-mono text-xs">P{i}:</Label>
									{#each row as cell, j}
										<Input
											bind:value={max[i][j]}
											type="number"
											min="0"
											class="w-12 h-8 text-center text-sm"
										/>
									{/each}
								</div>
							{/each}
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Available Resources -->
			<Card>
				<CardHeader>
					<CardTitle class="text-lg">Available Resources</CardTitle>
					<CardDescription>Currently available instances</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="flex items-center gap-3 justify-center">
						{#each available as resource, i}
							<div class="flex flex-col items-center gap-1">
								<Label class="text-xs text-muted-foreground">R{i}</Label>
								<Input
									bind:value={available[i]}
									type="number"
									min="0"
									class="w-12 h-8 text-center text-sm"
								/>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>

			<!-- Run Algorithm Button -->
			<div class="text-center">
				<Button
					onclick={runAlgorithm}
					size="lg"
					class="text-xl px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full"
				>
					🚀 Run Banker's Algorithm
				</Button>
			</div>
		</div>
	</div>

	<!-- Results -->
	{#if result}
		{#if result.isSafe}
			<Alert class="border-green-200 bg-green-50">
				<AlertTitle class="text-green-800">✅ System is SAFE</AlertTitle>
				<AlertDescription class="text-green-700">
					<strong>Safe Sequence:</strong> P{result.sequence.join(' → P')}
				</AlertDescription>
			</Alert>
		{:else}
			<Alert variant="destructive">
				<AlertTitle>❌ System is UNSAFE</AlertTitle>
				<AlertDescription>
					<strong>Deadlock detected!</strong><br />
					<strong>Partial Sequence:</strong> P{result.sequence.join(' → P')} → ?
				</AlertDescription>
			</Alert>
		{/if}

		<Card class="mt-4">
			<Collapsible.Root>
				<Collapsible.Trigger class="w-full">
					<CardHeader class="cursor-pointer hover:bg-muted/50 transition-colors">
						<div class="flex items-center justify-between">
							<CardTitle>Available Resources Timeline</CardTitle>
							<span class="text-xs text-muted-foreground">Click to expand</span>
						</div>
					</CardHeader>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<CardContent>
						<div class="space-y-2">
							{#each result.availableSequence as availableRes, i}
								<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
									<span class="font-mono"
										><strong>Step {i}:</strong> [{availableRes.join(', ')}]</span
									>
									<Badge variant="outline">
										{#if i > 0}
											After P{result.sequence[i - 1]} completes
										{:else}
											Initial state
										{/if}
									</Badge>
								</div>
							{/each}
						</div>
					</CardContent>
				</Collapsible.Content>
			</Collapsible.Root>
		</Card>
	{/if}
</div>
