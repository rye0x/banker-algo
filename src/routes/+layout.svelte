<script lang="ts">
	import '../app.css';

	export let children;
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

{@render children?.()}
