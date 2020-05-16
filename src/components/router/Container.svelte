<script>import { SvelteComponent } from "svelte";

	import { component, setComponent } from "./routerStore"	
	import Error from "./Error.svelte"

   export let error = Error

   $: if (window.location.pathname) {
      setComponent(window.location.pathname)
   }

</script>

<div class="router-container">
   {#if $component}
      <svelte:component this={$component} />
   {:else}
      <svelte:component this={error} />
   {/if}
</div>