<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	function navigateToAlgorithm() {
		goto('/algorithm');
	}
</script>

<svelte:head>
	<title>Banker's Algorithm Simulator</title>
</svelte:head>

<div
	class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8"
>
	<div class="text-center space-y-8">
		<!-- Main Title -->
		<h1 class="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-800 tracking-tight">🏦</h1>
		<h1
			class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight leading-none"
		>
			Banker's Algorithm
		</h1>
		<h2 class="text-2xl md:text-3xl lg:text-4xl font-light text-slate-600 tracking-wide">
			Simulator
		</h2>

		<!-- Subtitle -->
		<p class="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
			Interactive deadlock avoidance algorithm demonstration
		</p>

		<!-- Calculate Button -->
		<div class="pt-8">
			<Button
				onclick={navigateToAlgorithm}
				size="lg"
				class="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
			>
				Start Calculating
			</Button>
		</div>
	</div>
</div>
